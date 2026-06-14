import Expense from "../models/expense.model.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createExpense = async (req, res) => {
  const { amount, title, description, category } = req.body;
  if (!amount || !title || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(amount)) {
    return res.status(400).json({ message: "Amount must be a number" });
  }

  if (amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be greater than zero" });
  }

  try {
    const expense = new Expense({
      owner: req.user._id,
      amount,
      title,
      description,
      category,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ _id: id, owner: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;

  const { owner, ...updateData } = req.body;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Expense.distinct("category", {
      owner: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
