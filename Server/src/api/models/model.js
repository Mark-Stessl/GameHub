import { query } from '../../db/index.js';

export const getAllGames = async () => {
  const { rows } = await query('SELECT * FROM games');
  return rows;
};
