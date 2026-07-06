<script setup lang="ts">
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const date = ref("");
const duration = ref<number | null>(null);
const distance = ref<number | null>(null);

const saveTraining = async () => {

  if(
    !date.value ||
    duration.value===null ||
    distance.value===null
  ){
    alert("Completa todos los campos");
    return;
  }

  await addDoc(collection(db,"trainings"),{
    date:date.value,
    duration:duration.value,
    distance:distance.value
  });

  date.value="";
  duration.value=null;
  distance.value=null;
}
</script>

<template>

<div class="card">

<h2>Registrar entrenamiento</h2>

<input
type="date"
v-model="date"
/>

<input
type="number"
placeholder="Duración (min)"
v-model="duration"
/>

<input
type="number"
placeholder="Distancia (km)"
v-model="distance"
/>

<button @click="saveTraining">
Guardar entrenamiento
</button>

</div>

</template>

<style scoped>

.card{

display:flex;
flex-direction:column;
gap:15px;

margin-bottom:30px;

}

h2{

color:#34495e;

}

input{

padding:12px;

border-radius:8px;

border:1px solid #ccc;

font-size:16px;

}

button{

padding:12px;

background:#2ecc71;

color:white;

font-size:16px;

border:none;

border-radius:8px;

cursor:pointer;

transition:.3s;

}

button:hover{

background:#27ae60;

}

</style>