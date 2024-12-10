<script setup>
console.log("Mark Stessl");
</script>

<template>
  <div class="page">
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Impressum</h3>
          <p class="card-text">
            Implementiert von Mark Stessl
          </p>
          <p>&copy; HTL Wien West, 2024</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page background styling */
.page {
  background-color: #36353B; /* Set the page background color */
  min-height: 100vh; /* Full-page height */
  padding: 1rem; /* Ensure some spacing around the content */
}

/* Center the content horizontally */
.page-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%; /* Ensure the content stretches within the page */
}

/* Card styling remains unchanged */
.card {
  margin: 1rem auto;
  max-width: 400px;
  background-color: #211E23;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-align: center;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-family: 'Exo_2';
}

.card-text, p {
  font-size: 1rem;
  line-height: 1.5;
  font-family: 'Exo_2';
}
</style>
