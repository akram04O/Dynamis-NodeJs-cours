import { Report } from "../models/reports.js";
import { Budget } from "../models/budget.js";
import { Expense } from "../models/expense.js";


export const getDetailedMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.params;
    const userId = req.user.id;
    const report = await Report.findOne({ userId, month, year })
      .populate('budget')
      .populate('expenses');
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};