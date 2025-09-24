import { Router } from 'express';
import { 
  getDetailedMonthlyReport
} from '../controllers/reportController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/monthly/detailed/:month/:year', getDetailedMonthlyReport);

export default router;