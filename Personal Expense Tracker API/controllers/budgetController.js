import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  const { month, amount } = req.body;
  try {
    const existingBudget = await Budget.findOne({ user: req.user.id, month });
    if (existingBudget) {
      return res.status(400).json({ message: "Budget for this month already exists" });
    }
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: "Failed to create budget", error: error.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budgets", error: error.message });
  }
};

export const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findOne({ _id: req.params.id, user: req.user.id });
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budget", error: error.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { amount },
      { new: true }
    );

    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Failed to update budget", error: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget", error: error.message });
  }
};
