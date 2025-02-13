import express from 'express';
import { getGames, addGame, editGame, removeGame } from '../controllers/controller.js';

const router = express.Router();

router.get('/', getGames);
router.delete('/:id', removeGame);
router.post('/', addGame);
router.put('/:id', editGame);

export default router;
