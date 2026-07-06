<script setup lang="ts">
import TrainingForm from "./components/TrainingForm.vue";
import TrainingList from "./components/TrainingList.vue";
</script>

<template>
  <div class="container">
    <h1>🏃 MVT Entrenamientos</h1>

    <TrainingForm />

    <TrainingList />
  </div>
</template>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:#eef2f7;
  font-family:Arial, Helvetica, sans-serif;
}

.container{
  width:700px;
  max-width:90%;
  margin:40px auto;
  background:white;
  padding:30px;
  border-radius:15px;
  box-shadow:0 10px 25px rgba(0,0,0,.15);
}

h1{
  text-align:center;
  margin-bottom:30px;
  color:#2c3e50;
}
</style>