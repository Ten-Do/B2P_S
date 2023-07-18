import { Router } from "express";
import { OrdersController } from "../controllers/orders.js";
import { PaymentSystemsController } from "../controllers/paymentSystem.js";
// import authMiddleware from "../middlewares/auth";
// import roleMiddleware from "../middlewares/role";
// import imgValidation from "../middlewares/validation";
// import fieldsTaskMiddleware from "../middlewares/tasks/fields-task";

const apiRouter = new Router();

// router.post("/login", login);
// router.delete("/logout", logout);
// router.get("/refresh", refresh);

apiRouter.get("/payment_systems", PaymentSystemsController.getAll);            // [{}, {}, {}, ...] (на скрине показывал что в объекте сидит)
apiRouter.get("/getFee", PaymentSystemsController.getFee);                     // not for admin
apiRouter.post("/order", OrdersController.add);                                // not for admin
apiRouter.get("/orders", OrdersController.getAllOrders);                       // get all orders for table with orders (logic)
apiRouter.get("/totalRevenue", OrdersController.getTotalRevenue);              // {value: integer}
apiRouter.get("/totalCustomers", OrdersController.getTotalCustomers);          // {value: integer}
apiRouter.get("/totalOrderCanceled", OrdersController.getTotalOrderCanceled);  // {value: integer}
apiRouter.get("/totalOrders", OrdersController.getTotalOrders);                // {value: integer}

export default apiRouter;
