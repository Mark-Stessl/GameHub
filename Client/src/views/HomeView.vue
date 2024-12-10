<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/userstore';

const store = useUserStore();

onMounted(async () => {
  await store.GetGames();
});
</script>

<template>
  <div>
    <div class="page-container">
      <div class="cards-container">
        <div
          v-for="game in store.game"
          :key="game.id"
          class="game-card"
        >
          <img :src="game.img" class="card-img" :alt="game.title" />
          <div class="card-content">
            <h3 class="card-title">{{ game.title }}</h3>
            <p><strong>Genre:</strong> {{ game.genre }}</p>
            <p><strong>Plattform:</strong> {{ game.platform }}</p>
            <p><strong>Bewertung:</strong> {{ game.rating }}</p>
            <p><strong>Veröffentlichtungsdatum:</strong> {{ game.release_date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 1rem;
  background-color: #36353B;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
}

.game-card {
  background-color: #211e23;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid #333;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Exo_2';
}

/* Medium screens (e.g., tablets) */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.2rem;
  }

  .card-content {
    padding: 0.75rem;
  }
}

/* Small screens (e.g., mobile) */
@media (max-width: 480px) {
  .card-title {
    font-size: 1rem;
  }

  .card-content {
    padding: 0.5rem;
  }
}
</style>
