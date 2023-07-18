import pool from "../database/db.js";

export class PaymentSystemsController {
  static async update(req, res, next) {}
  static async getAll(req, res, next) {
    pool
      .query(
        `SELECT o.id, o.amount, o.fee, o.email, o.description, o.status, ps.name
         FROM orders AS o JOIN payment_systems AS ps ON o.payment_system=ps.id;`
      )
      .then((data) => res.json(data.rows))
      .catch((error) => next(error));
  }

  static async getFee(req, res, next) {
    const paymentSystem = detectPaymentSystem(req.query.cardNum);
    pool
      .query(
        `SELECT fee, min_fee FROM payment_systems WhERE name='${paymentSystem}';`
      )
      .then((data) => res.json(data.rows[0] || {}))
      .catch((error) => next(error));
  }
}

const detectPaymentSystem = (cardNumber) => {
  if (/^4/.test(cardNumber)) {
    return "Visa";
  } else if (/^5[1-5]/.test(cardNumber)) {
    return "MasterCard";
  } else if (/^220[0-4]/.test(cardNumber)) {
    return "Mir";
  } else if (/^3[47]/.test(cardNumber)) {
    return "Amex";
  } else if (/^6(?:011|5)/.test(cardNumber)) {
    return "Discover";
  } else if (/^(?:2131|1800|35)/.test(cardNumber)) {
    return "JCB";
  } else if (/^3(?:0[0-5]|[68])/.test(cardNumber)) {
    return "Diners Club";
  } else if (
    /^(?:5[0678]|6[0-9])/.test(cardNumber) ||
    /^(?:5018|5020|5038|6304|6759|6761|6763)/.test(cardNumber)
  ) {
    return "Maestro";
  } else if (/^(?:5[1-5]|6(?:011|5))/.test(cardNumber)) {
    return "PayPal";
  }
};
