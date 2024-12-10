import express from 'express';
import asyncHandler from 'express-async-handler';
import { getGames } from '../controllers/controller.js';
const router = express.Router();

router.get('/', asyncHandler(getGames));

export default router;
