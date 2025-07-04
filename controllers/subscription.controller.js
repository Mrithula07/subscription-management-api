import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
import dayjs from "dayjs";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      userId: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    console.log("Token User ID:", req.user.id);
    console.log("Param ID:", req.params.id);
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ userId: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().populate(
      "userId",
      "name email"
    );
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    // ✅ Validate ownership
    if (subscription.userId._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    // ✅ Validate ownership
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to update this subscription",
        });
    }

    Object.assign(subscription, req.body);
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    // ✅ Validate ownership before deletion
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this subscription",
      });
    }

    await subscription.deleteOne(); // ⬅️ only delete after ownership is verified

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    // ✅ Validate ownership
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this subscription",
      });
    }

    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({ success: true, message: "Subscription cancelled" });
  } catch (e) {
    next(e);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const nextWeek = dayjs().add(7, "day").toDate();

    const subscriptions = await Subscription.find({
      userId: req.user._id,
      renewalDate: { $lte: nextWeek },
      status: "active",
    }).populate("userId", "name email");

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
