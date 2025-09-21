import { Expense } from "../models/expense.js";
import { Budget } from "../models/Budget.js";

export const createExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  try {
    const expense = new Expense({
      userId: req.user.id, 
      amount,
      category,
      date,
      description,
    });

    await expense.save();

    const checkMonth = month(month);
    const budget = await Budget.findOne({ user: req.user.id, month: checkMonth });
    if (budget) {
      const totalExpenses = await Expense.aggregate([
        { $match: { userId: req.user.id, date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) } } },
        { $group: { _id: null, total: { $sum: "$amount" } }},
      ]);

      if (totalExpenses[0]?.total > budget.amount) {
        return res.status(400).json({ message: "Budget exceeded" });
      }
    }

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};


export const getExpenseByCategoryAndDate = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    let filter = { userId: req.user.id };

    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};

export const getExpenseMonthlySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Please provide month and year" });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate monthly summary",
      error: error.message
    });
  }
};
