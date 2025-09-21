import { generateWeeklyReport, generateMonthlyReport, getWeeklyReport, getMonthlyReport } from '../controllers/reportesController.js';
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();

router.use(authMiddleware);

router.post('/weekly', generateWeeklyReport);
router.get('/weekly/:month/:year', getWeeklyReport);

router.post('/monthly', generateMonthlyReport);
router.get('/monthly/:month', getMonthlyReport);

export default router;