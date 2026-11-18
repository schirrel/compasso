<script setup lang="ts">
import MyStudio from '../components/MyStudios.vue'
</script>

<template>
  <v-toolbar color="surface" elevation="1" height="84">
    <template #title>
      <h2 class="text-headline-large font-weight-bold">Home</h2>
    </template>
  </v-toolbar>

   <div class="pa-4">
    <!--<v-sheet
      border="line sm"
      height="500"
      rounded="lg"
      width="100%"
      class="pa-4"
    >
     -->
    <MyStudio />
    <!-- </v-sheet> -->
  </div> 
</template>
