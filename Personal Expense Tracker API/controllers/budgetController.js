import {Budget} from "../models/budget.js";

export const createBudget = async (req, res) => {
  try {
    const { amount, category, month, year } = req.body;

    if (!amount || !month || !year) {
      return res.status(400).json({ message: "Amount, month and year are required" });
    }

    const isBudgetExist = await Budget.findOne({ 
      user: req.user.id, 
      category, 
      month, 
      year 
    });

    if (isBudgetExist) {
      return res.status(400).json({ message: "Budget already exists for this category and month" });
    }

    const budget = new Budget({
      user: req.user.id,
      amount,
      category,
      month,
      year,
    });
    
    await budget.save();
    res.status(201).json(budget);
    
  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;
    let query = { user: req.user.id };
    
    if (month) query.month = month;
    if (year) query.year = year;

    const budgets = await Budget.find(query);
    res.status(200).json(budgets);
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const budget = await Budget.findOne({ 
      _id: id, 
      user: req.user.id 
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    budget.amount = amount;
    await budget.save();
    res.status(200).json(budget);
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOne({ 
      _id: id, 
      user: req.user.id 
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    await Budget.deleteOne({ _id: id });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const countTotalBudgetsAmount = async (req, res) => {
  try {
    const { month, year } = req.query;
    let query = { user: req.user.id };
    
    if (month) query.month = month;
    if (year) query.year = year;

    const totalAmount = await Budget.aggregate([
      { $match: query },
      { $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).json({ 
      totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0 
    });
  } catch (error) {
    console.error('Count total budgets error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};