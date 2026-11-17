<script setup lang="ts">
import { API } from '../services/API'
async function load() {
 const response = await API.get('/api/studios/');
 console.log(response);
}

load();
</script>

<template>
  <section>
    <h2>Studio</h2>
  </section>
</template>
