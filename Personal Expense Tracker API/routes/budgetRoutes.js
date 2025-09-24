import { Router } from "express";
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  countTotalBudgetsAmount
} from "../controllers/budgetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

// Budget CRUD routes
router.post("/", createBudget);
router.get("/", getBudgets);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

router.get("/total", countTotalBudgetsAmount);

export default router;
