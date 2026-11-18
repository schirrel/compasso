<script setup lang="ts">
import { useRouter } from 'vue-router';
import { StudioMgmtAPI } from '../services/API'
import { ref } from 'vue';
const router = useRouter();

const loading = ref(true);
const studios = ref([]);
 const headers = [
      { title: 'Actions', key: 'actions', sortable: false, width: 50 },
    { title: 'Status', key: 'status', width: 100 },
    { title: 'Name', key: 'name', align: 'start' },
    { title: 'Phone', key: 'phone' },
    { title: 'Address', key: 'address' },
    { title: 'City/State', key: 'city' },
  ]

async function load() {
    loading.value = true;
    try {
        const response = await StudioMgmtAPI.get('/');
        studios.value = response.data;
    } catch (e) {
        console.warn(e);
    }
    loading.value = false;
}
load();

const edit = (id) => router.push('/studio/' + id)


</script>

<template>
  <v-toolbar color="surface" elevation="1" height="84">
    <template #title>
      <h2 class="text-headline-large font-weight-bold">Studios</h2>
    </template>
      <v-btn color="primary"
        variant="flat"
        @click="router.push('/studio')"> New Studio</v-btn>
  </v-toolbar>

   <div class="pa-4">
    <v-data-table :items="studios" :headers="headers">
       <template v-slot:item.city="{ item }">
        {{ item.city }} - {{ item.state }}
      </template>
       <template v-slot:item.status="{ item }">
        <v-chip
        :color="item.approved ? 'success' : 'warning'"
        :text="item.approved ? 'Published' : 'Moderation'"
        size="x-small"
      ></v-chip>
      </template>
       <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-btn color="primary" size="small" @click="edit(item.id)">Edit</v-btn>
        </div>
      </template>
    </v-data-table>
  </div> 
</template>
