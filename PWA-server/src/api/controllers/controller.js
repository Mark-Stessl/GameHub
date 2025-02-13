import asyncHandler from 'express-async-handler';
import { getAllGames, createGame, updateGame, deleteGame } from '../models/model.js';

export const getGames = asyncHandler(async (req, res) => {
  res.status(200).json(await getAllGames());
});

export const removeGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedGame = await deleteGame(id);
  if (!deletedGame) {
    res.status(404);
    throw new Error('Game not found');
  }
  res.status(200).json({ message: 'Game deleted successfully', deletedGame });
});

export const addGame = asyncHandler(async (req, res) => {
  const { title, genre, platform, rating, release_date, img } = req.body;
  if (!title || !genre || !platform || rating === undefined || !release_date || !img) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const game = await createGame(title, genre, platform, rating, release_date, img);
  res.status(201).json(game);
});

export const editGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, genre, platform, rating, release_date, img } = req.body;
  const updatedGame = await updateGame(id, title, genre, platform, rating, release_date, img);
  if (!updatedGame) {
    res.status(404);
    throw new Error('Game not found');
  }
  res.status(200).json(updatedGame);
});


