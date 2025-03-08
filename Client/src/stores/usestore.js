import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore('userstore', () => {
  const game = ref([]);
  const API = import.meta.env.VITE_PRODUCTION || 'http://localhost:3000';
  const GetGames = async () => {
    const response = await axios.get(API + '/games');
    game.value = response.data;
  };

  // Delete a game
  const deleteGame = async (id) => {
    await axios.delete(API + '/games/' + id);
    await GetGames();
  };

  const addGame = async (newGame) => {
    try {
      await axios.post(API + '/games', newGame);
      await GetGames();
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  // Update a game
  const updateGame = async (id, updatedGame) => {
    try {
      await axios.put(`${API}/games/${id}`, updatedGame);
      await GetGames();
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return { game, GetGames, deleteGame, addGame, updateGame };
});
