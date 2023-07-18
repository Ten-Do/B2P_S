import pool from "../database/db.js";
import { identifyPaymentSystem } from "../utils/identifyPaymentSystem.js";

export class OrdersController {
  static async add(req, res, next) {
    const { amount, email, description, cardNum } = req.body;
    const status = "ok";
    const payment_system = identifyPaymentSystem(cardNum);
    const { fee, min_fee } = await pool
      .query(
        `SELECT fee, min_fee FROM payment_systems WHERE name='${payment_system}'`
      )
      .then((data) => data.rows[0]);

    await pool
      .query(
        `
      INSERT INTO orders (amount, fee, email, description, payment_system, status) 
      VALUES (${amount}, ${
          fee * amount < min_fee * 100
            ? min_fee
            : parseInt((fee * amount) / 100)
        }, '${email}', '${description}', (SELECT id FROM payment_systems WHERE name='${payment_system}'), '${status}');
    `
      )
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).send(err));
  }

  static async getAllOrders(req, res, next) {
    pool
      .query(`SELECT * FROM orders;`)
      .then((data) => res.json(data.rows || []));
  }

  static async getTotalRevenue(req, res, next) {
    pool
      .query(`SELECT SUM(fee) as 'value' FROM orders;`)
      .then((data) => res.json(data.rows[0] || { value: 0 }));
  }

  static async getTotalOrders(req, res, next) {
    pool
      .query(`SELECT COUNT(id) as 'value' FROM orders;`)
      .then((data) => res.json(data.rows[0] || { value: 0 }));
  }

  static async getTotalCustomers(req, res, next) {
    pool
      .query(`SELECT COUNT(DISTINCT email) as 'value' FROM orders;`)
      .then((data) => res.json(data.rows[0] || { value: 0 }));
  }

  static async getTotalOrderCanceled(req, res, next) {
    res.json({ value: 0 });
  }
}
