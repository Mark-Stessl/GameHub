import asyncHandler from 'express-async-handler';
import { getAllGames } from '../models/model.js';

export const getGames = asyncHandler(async (req, res) => {
  res.status(200).json(await getAllGames());
});
