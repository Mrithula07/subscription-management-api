import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);
subscriptionRouter.get("/", authorize, getAllSubscriptions);
subscriptionRouter.get("/:id", authorize, getSubscriptionById);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", authorize, updateSubscription);
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);
export default subscriptionRouter;
