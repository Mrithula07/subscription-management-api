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

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management APIs
 */

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - currency
 *               - frequency
 *               - category
 *               - paymentMethod
 *               - startDate
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *               frequency:
 *                 type: string
 *               category:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Subscription created successfully
 */

/**
 * @swagger
 * /api/v1/subscriptions/user/{id}:
 *   get:
 *     summary: Get subscriptions for a specific user
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's subscriptions fetched
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: All subscriptions fetched successfully
 */

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription fetched successfully
 *       403:
 *         description: Unauthorized to view this subscription
 *       404:
 *         description: Subscription not found
 */

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               price: 200
 *               category: "utilities"
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       403:
 *         description: Unauthorized to update this subscription
 *       404:
 *         description: Subscription not found
 */

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *       403:
 *         description: Not authorized to delete this subscription
 *       404:
 *         description: Subscription not found
 */

/**
 * @swagger
 * /api/v1/subscriptions/cancel/{id}:
 *   patch:
 *     summary: Cancel a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subscription ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription cancelled
 *       403:
 *         description: Unauthorized to cancel this subscription
 *       404:
 *         description: Subscription not found
 */

/**
 * @swagger
 * /api/v1/subscriptions/upcoming:
 *   get:
 *     summary: Get subscriptions renewing within the next 7 days
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of upcoming subscription renewals
 */
