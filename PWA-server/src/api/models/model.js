import { query } from '../../db/index.js';

export const getAllGames = async () => {
  const { rows } = await query('SELECT * FROM games');
  return rows;
};

export const deleteGame = async (id) => {
  const { rows } = await query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};

export const createGame = async (title, genre, platform, rating, release_date, img) => {
  const { rows } = await query(
    'INSERT INTO games (title, genre, platform, rating, release_date, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, genre, platform, rating, release_date, img],
  );
  return rows[0];
};

export const updateGame = async (id, title, genre, platform, rating, release_date, img) => {
  const { rows } = await query(
    'UPDATE games SET title = $1, genre = $2, platform = $3, rating = $4, release_date = $5, img = $6 WHERE id = $7 RETURNING *',
    [title, genre, platform, rating, release_date, img, id],
  );
  return rows[0];
};
