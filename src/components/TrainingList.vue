<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

interface Training{
id:string;
date:string;
duration:number;
distance:number;
}

const trainings=ref<Training[]>([]);

const editingId=ref<string|null>(null);
const editDate=ref("");
const editDuration=ref<number|null>(null);
const editDistance=ref<number|null>(null);

onMounted(()=>{

const trainingsRef = query(
  collection(db, "trainings"),
  orderBy("date", "desc")
);

onSnapshot(trainingsRef,(snapshot)=>{

trainings.value=snapshot.docs.map(docSnap=>({

id:docSnap.id,
...(docSnap.data() as Omit<Training,"id">)

}));

});

});

const deleteTraining=async(id:string)=>{

await deleteDoc(doc(db,"trainings",id));

}

const startEdit=(training:Training)=>{

editingId.value=training.id;
editDate.value=training.date;
editDuration.value=training.duration;
editDistance.value=training.distance;

}

const saveEdit=async()=>{

if(!editingId.value)return;

await updateDoc(doc(db,"trainings",editingId.value),{

date:editDate.value,
duration:editDuration.value,
distance:editDistance.value

});

cancelEdit();

}

const cancelEdit=()=>{

editingId.value=null;
editDate.value="";
editDuration.value=null;
editDistance.value=null;

}
</script>

<template>

<div>

<h2>Historial de entrenamientos</h2>

<div
v-for="training in trainings"
:key="training.id"
class="training"
>

<div v-if="editingId!==training.id">

<p><strong>Fecha:</strong> {{training.date}}</p>

<p><strong>Duración:</strong> {{training.duration}} min</p>

<p><strong>Distancia:</strong> {{training.distance}} km</p>

<button @click="startEdit(training)">
Editar
</button>

<button @click="deleteTraining(training.id)">
Eliminar
</button>

</div>

<div v-else>

<input
type="date"
v-model="editDate"
/>

<input
type="number"
v-model="editDuration"
/>

<input
type="number"
v-model="editDistance"
/>

<button @click="saveEdit">
Guardar
</button>

<button @click="cancelEdit">
Cancelar
</button>

</div>

</div>

</div>

</template>

<style scoped>

h2{

margin-bottom:20px;

color:#34495e;

}

.training{

background:#f8f9fa;

padding:20px;

border-radius:10px;

margin-bottom:15px;

box-shadow:0 2px 8px rgba(0,0,0,.1);

}

p{

margin:8px 0;

font-size:16px;

}

button{

padding:8px 14px;

margin-right:10px;

border:none;

border-radius:6px;

cursor:pointer;

font-weight:bold;

}

button:first-of-type{

background:#3498db;

color:white;

}

button:last-of-type{

background:#e74c3c;

color:white;

}

button:hover{

opacity:.9;

}

input{

padding:8px;

margin:5px;

border:1px solid #ccc;

border-radius:5px;

}

</style>