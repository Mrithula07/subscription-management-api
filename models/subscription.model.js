import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR", "JPY"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: ["entertainment", "utilities", "food", "health", "other"],
      default: "other",
      required: [true, "Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (this.isNew && !this.renewalDate) {
    this.renewalDate = new Date(this.startDate);
    if (this.frequency === "weekly") {
      this.renewalDate.setDate(this.renewalDate.getDate() + 7);
    } else if (this.frequency === "monthly") {
      this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
    } else if (this.frequency === "yearly") {
      this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
    }
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
