import { Report } from "../models/reports.js";
import { Budget } from "../models/budget.js";
import { Expense } from "../models/expense.js";


export const getDetailedMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.params;

    const budgets = await Budget.find({
      user: req.user.id,
      month,
      year: parseInt(year)
    });

    const startDate = new Date(year, parseInt(month) - 1, 1);
    const endDate = new Date(year, parseInt(month), 0);

    const expenses = await Expense.find({
      userId: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    let reportData = {
      categories: {},
      totalBudget: 0,
      totalExpenses: 0,
      remainingBudget: 0,
    };

    budgets.forEach(budget => {
      const category = budget.category || 'Uncategorized';
      if (!reportData.categories[category]) {
        reportData.categories[category] = {
          budget: budget.amount,
          expenses: 0,
          remaining: budget.amount
        };
      }
      reportData.totalBudget += budget.amount;
    });

    expenses.forEach(expense => {
      const category = expense.category || 'Uncategorized';
      if (!reportData.categories[category]) {
        reportData.categories[category] = {
          budget: 0,
          expenses: 0,
          remaining: 0
        };
      }
      reportData.categories[category].expenses += expense.amount;
      reportData.categories[category].remaining = 
        reportData.categories[category].budget - reportData.categories[category].expenses;
      reportData.totalExpenses += expense.amount;
    });

    reportData.remainingBudget = reportData.totalBudget - reportData.totalExpenses;

    console.table(Object.entries(reportData.categories).map(([category, data]) => ({
      Category: category,
      Budget: `$${data.budget.toFixed(2)}`,
      Expenses: `$${data.expenses.toFixed(2)}`,
      Remaining: `$${data.remaining.toFixed(2)}`,
      Status: data.remaining < 0 ? '⚠️ Over Budget' : '✅ Within Budget'
    })));

    console.log('\nSummary:');
    console.table({
      'Total Budget': `$${reportData.totalBudget.toFixed(2)}`,
      'Total Expenses': `$${reportData.totalExpenses.toFixed(2)}`,
      'Remaining Budget': `$${reportData.remainingBudget.toFixed(2)}`,
      'Overall Status': reportData.remainingBudget < 0 ? '⚠️ Over Budget' : '✅ Within Budget'
    });

    const report = new Report({
      userId: req.user.id,
      month,
      year: parseInt(year),
      budget: budgets.map(b => b._id),
      expenses: expenses.map(e => e._id),
      totalExpenses: reportData.totalExpenses
    });

    await report.save();

    res.status(200).json({
      report: reportData,
      reportId: report._id
    });

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};