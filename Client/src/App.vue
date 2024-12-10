<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function navigateTo(route) {
  isMenuOpen.value = false; // Close the menu
  router.push(route); // Navigate to the route
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated class="navbar text-white">
      <q-toolbar class="toolbar">
        <!-- Burger Menu -->
        <q-btn flat round dense icon="menu" @click="toggleMenu" />

        <!-- Title -->
        <q-toolbar-title>
          <q-avatar>
            <img src="../dist/icons/PWA_logo.png" style="width: 60px;" />
          </q-avatar>
          Welcome to GameHub
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Burger Menu) -->
    <q-drawer
      v-model="isMenuOpen"
      side="left"
      overlay
      class="drawer"
      content-class="drawer-content"
    >
      <q-list>
        <q-item clickable v-ripple @click="navigateTo('/')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/about')">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Impressum</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.navbar {
  background-color: #211e23;
  height: 80px; /* Increased height */
}

.toolbar {
  min-height: 80px; /* Adjust the toolbar height */
  font-family: 'Exo_2';
}

.drawer {
  background-color: #211e23;
  color: white;
  
}

.drawer-content {
  background-color: #211e23; 
  color: white;
}

@font-face {
  font-family: 'Exo2-Italic-VariableFont_wght';
  src: url('../dist/fonts/Exo_2/Exo2-Italic-VariableFont_wght.ttf') format('truetype');
}

@font-face {
  font-family: 'Exo_2';
  src: url('../dist/fonts/Exo_2/Exo2-Italic-VariableFont_wght.ttf') format('truetype');
}

@font-face {
  font-family: 'Exo_2';
  src: url('../dist/fonts/Exo_2/Exo2-Italic-VariableFont_wght.ttf') format('truetype');
}
</style>

