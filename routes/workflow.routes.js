import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendReminders);

export default workflowRouter;

/**
 * @swagger
 * /api/v1/workflows/subscription/reminder:
 *   post:
 *     summary: Trigger reminder workflow for a subscription
 *     tags: [Workflows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: The ID of the subscription to track reminders for
 *     responses:
 *       200:
 *         description: Workflow triggered successfully
 *       400:
 *         description: Invalid subscription ID
 */
