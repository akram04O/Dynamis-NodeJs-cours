import { Report } from "../models/reports";


export const generateWeeklyReport = async (req, res) => {
    try {
      const { month, year } = req.body;
        const report = await Report.findOne({ userId: req.user.id, month, year });
        if (report) {
            return res.status(400).json({ message: "Report already exists" });
        }
        const newReport = new Report({
            userId: req.user.id,
            month,
            year,
            budget: [],
            expenses: [],
        });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getWeeklyReport = async (req, res) => {
    try {
        const { month, year } = req.params;
        const report = await Report.findOne({ userId: req.user.id, month, year });  
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const generateMonthlyReport = async (req, res) => {
  try {
    const { month } = req.body;
    const report = await Report.findOne({ userId: req.user.id, month });
    if (report) {
      return res.status(400).json({ message: "Report already exists" });
    }
    const newReport = new Report({
      userId: req.user.id,
      month,
      budget: [],
      expenses: [],
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMonthlyReport = async (req, res) => {
  try {
    const { month } = req.params;
    const report = await Report.findOne({ userId: req.user.id, month });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};