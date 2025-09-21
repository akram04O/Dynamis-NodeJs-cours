import { Router } from "express";
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense, getExpenseMonthlySummary } from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/monthly-summary", getExpenseMonthlySummary);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;




