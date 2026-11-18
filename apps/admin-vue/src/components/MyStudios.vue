<script setup lang="ts">
import { StudioMgmtAPI } from '../services/API'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const studios = ref([]);
const loading = ref(true);
const router = useRouter();

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

function open(id) {
    router.push('/studio/' + id)
}
</script>

<template>
    <section>
        <cp-loading v-show="loading" variant="full">Loading Studios</cp-loading>
        <ul>
            <li v-for="studio in studios" class="studio-card">
                <cp-card>
                    <header>
                        <h3 class="studio-card__title">{{ studio.name }}</h3> <cp-badge :tone="studio.approved ? 'success' : 'danger'"> {{ studio.approved ? 'Published' : 'In Moderation' }}</cp-badge>
                    </header>
                    <div>
                        Address: {{ studio.city }}
                    </div>
                    <footer>
                        <cp-button variant="ghost" type="button">
                            View Analytics
                        </cp-button>
                        <cp-button @click="open(studio.id)" type="button">
                            Manage Studio
                        </cp-button>
                    </footer>
                </cp-card>
            </li>
        </ul>
    </section>
</template>


<style scoped>
ul {
    display: grid;
    list-style: none;
    gap: var(--cp-space-4);
    grid-template-columns: 1fr 1fr 1fr;
    color: black
}

.studio-card footer {
    display: flex;
    gap: var(--cp-space-4);
    margin-top: var(--cp-space-4);
}
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.studio-card__title {
    padding: 0px;
    margin: 0px;
    display: inline;
}
</style>