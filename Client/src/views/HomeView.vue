<template>
  <div>
    <div class="page-container">
      <!-- Offline Banner -->
      <div v-if="isOffline" class="offline-banner">
        Du bist derzeit offline. Einige Funktionen sind deaktiviert, bis die Verbindung wiederhergestellt ist
      </div>

      <!-- Add Game Button -->
      <q-btn class="add-game-btn" color="primary" @click="openAddGameDialog" :disable="isOffline">
        Add Game
      </q-btn>

      <div class="cards-container">
        <div v-for="game in store.game" :key="game.id" class="game-card">
          <img :src="game.img" class="card-img" :alt="game.title" />
          <div class="card-content">
            <h3 class="card-title">{{ game.title }}</h3>
            <p><strong>Genre:</strong> {{ game.genre }}</p>
            <p><strong>Plattform:</strong> {{ game.platform }}</p>
            <p><strong>Bewertung:</strong> {{ game.rating }}</p>
            <p><strong>Veröffentlichtungsdatum:</strong> {{ formatDate(game.release_date) }}</p>
          </div>
          <!-- Edit and Delete Buttons -->
          <div class="card-actions">
            <q-btn class="edit-btn" color="primary" @click="openEditGameDialog(game)" :disable="isOffline">
              Edit
            </q-btn>
            <q-btn class="delete-btn" color="negative" @click="store.deleteGame(game.id)" :disable="isOffline">
              Delete
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Game Dialog -->
    <q-dialog v-model="addGameDialog">
      <q-card class="custom-dialog">
        <q-card-section>
          <div class="text-h6">Add New Game</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="newGame.title" label="Title" dark filled />
          <q-input v-model="newGame.genre" label="Genre" dark filled />
          <q-input v-model="newGame.platform" label="Platform" dark filled />
          <q-input v-model="newGame.rating" label="Rating" type="number" dark filled />
          <q-input v-model="newGame.release_date" label="Release Date" type="date" dark filled />
          
          <!-- Image Capture -->
          <q-btn class="imgMargin" label="Take Photo" color="primary" @click="openCameraDialog" />
          <img v-if="newGame.img" :src="newGame.img" class="preview-img" />

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Add" color="primary" @click="addGame" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Camera Dialog -->
    <q-dialog v-model="cameraDialog">
      <camera-preview @capture="handleCapture" @close="cameraDialog = false" />
    </q-dialog>

    <!-- Edit Game Dialog -->
    <q-dialog v-model="editGameDialog">
      <q-card class="custom-dialog">
        <q-card-section>
          <div class="text-h6">Edit Game</div>
        </q-card-section>
        <q-card-section>
          <img :src="selectedGame.img" class="dialog-img" :alt="selectedGame.title" />
          <q-input v-model="selectedGame.title" label="Title" dark filled />
          <q-input v-model="selectedGame.genre" label="Genre" dark filled />
          <q-input v-model="selectedGame.platform" label="Platform" dark filled />
          <q-input v-model="selectedGame.rating" label="Rating" type="number" dark filled />
          <q-input v-model="selectedGame.release_date" label="Release Date" type="date" dark filled />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="updateGame" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../stores/usestore';
import CameraPreview from '../components/CameraPreview.vue';

const store = useUserStore();
const addGameDialog = ref(false);
const editGameDialog = ref(false);
const cameraDialog = ref(false);
const isOffline = ref(!navigator.onLine);
const newGame = ref({
  title: '',
  genre: '',
  platform: '',
  rating: 0,
  release_date: '',
  img: ''
});
const selectedGame = ref({
  id: null,
  title: '',
  genre: '',
  platform: '',
  rating: 0,
  release_date: '',
  img: ''
});

// Monitor online/offline status
const updateOnlineStatus = () => {
  isOffline.value = !navigator.onLine;
};

onMounted(async () => {
  await store.GetGames();
  
  // Add event listeners for online/offline events
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

const openAddGameDialog = () => {
  if (isOffline.value) return;
  addGameDialog.value = true;
};

const openEditGameDialog = (game) => {
  if (isOffline.value) return;
  selectedGame.value = { ...game };
  editGameDialog.value = true;
};

const openCameraDialog = () => {
  cameraDialog.value = true;
};

const handleCapture = (imageData) => {
  newGame.value.img = imageData;
  cameraDialog.value = false;
};

const addGame = async () => {
  if (isOffline.value) return;
  
  await store.addGame(newGame.value);
  addGameDialog.value = false;
  newGame.value = {
    title: '',
    genre: '',
    platform: '',
    rating: 0,
    release_date: '',
    img: ''
  };
};

const updateGame = async () => {
  if (isOffline.value) return;
  
  await store.updateGame(selectedGame.value.id, selectedGame.value);
  editGameDialog.value = false;
};

const formatDate = (dateString) => {
  return dateString ? dateString.split('T')[0] : ''; 
};
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #36353B;
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
  height: 100%;
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid #333;
}

.card-content {
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Exo_2';
}

.card-actions {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.add-game-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.dialog-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.preview-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border: 1px solid #ccc;
  margin-top: 2rem;
}

.custom-dialog {
  background-color: #211e23;
  color: #ffffff;
  width: 600px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.q-card-section .q-btn {
  margin-top: 1rem;
  display: block;
}

.imgMargin {
  margin-top: 1rem;
}

.offline-banner {
  background-color: #ff9800;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>