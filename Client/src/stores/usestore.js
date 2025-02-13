import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore('userstore', () => {
  const game = ref([]);

  const GetGames = async () => {
    const response = await axios.get('http://localhost:3000/games');
    game.value = response.data;
  };

  // Delete a game
  const deleteGame = async (id) => {
      await axios.delete('http://localhost:3000/games/' + id);
      await GetGames();
  };

  const addGame = async (newGame) => {
    try {
      await axios.post('http://localhost:3000/games', newGame);
      await GetGames();
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  // Update a game
  const updateGame = async (id, updatedGame) => {
    try {
      await axios.put(`http://localhost:3000/games/${id}`, updatedGame);
      await GetGames();
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return { game, GetGames, deleteGame, addGame, updateGame };
});
