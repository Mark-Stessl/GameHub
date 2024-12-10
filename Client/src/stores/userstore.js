import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore('userstore', () => {
  const game = ref([]);

  const GetGames = async () => {
    const response = await axios.get('http://localhost:3000/games');
    game.value = response.data;
  };

  return { game, GetGames };
});
