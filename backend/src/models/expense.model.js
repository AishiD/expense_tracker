    import mongoose from "mongoose";

    const expenseSchema = new mongoose.Schema(
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
      { timestamps: true },
    );

    const Expense = mongoose.model("Expense", expenseSchema);
    export default Expense;