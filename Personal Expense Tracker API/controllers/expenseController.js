import { Expense } from "../models/expense.js";
import { Budget } from "../models/budget.js";

export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: "Amount and category are required" });
    }
    const budget = await Budget.findOne({ user: req.user.id, category });
    if (!budget) return res.status(400).json({ message: "Budget not found" });
    if ( Expense.schema.path('category').cast(category) == Budget.schema.path('category').cast(category) && Expense.schema.path('amount').cast(amount) > Budget.schema.path('amount').cast(amount)) return res.status(400).json({ message: "Expense exceeds budget limit" });

    const expense = new Expense({
      userId: req.user.id,
      amount,
      category,
      date: date || new Date(),
      description
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    let query = { userId: req.user.id };

    if (startDate && endDate) {
      query.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }

    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const { id } = req.params;

    const expense = await Expense.findOne({ 
      _id: id, 
      userId: req.user.id 
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = date;
    if (description) expense.description = description;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ 
      _id: id, 
      userId: req.user.id 
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenseStats = async (req, res) => {
  try {
    const { month, year } = req.query;
    
    const stats = await Expense.aggregate([
      {
        $match: {
          userId: req.user.id,
          date: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1)
          }
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error('Get expense stats error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};
