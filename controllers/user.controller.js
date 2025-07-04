import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password ");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404; // Not Found
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Delete all subscriptions linked to this user
    await Subscription.deleteMany({ userId: user._id });

    // Delete the user after their subscriptions are removed
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User and their subscriptions deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
