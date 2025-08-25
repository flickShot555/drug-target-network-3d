// server/routes/drugResponse.js
import { Router } from 'express';
const router = Router();
import { search } from '../controllers/drugResponseController';

router.post('/search', search);

export default router;
