<script setup lang="ts">
import { StudioMgmtAPI } from '../services/API'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import StudioForm from '../components/StudioForm.vue';

const route = useRoute();
const studio = ref({});
const loading = ref(true);
const id = ref(route.params.id);

const tab = ref('studioInfo')

const saveStudio = async (updatedValue) => {
    loading.value = true;
    try {
        await StudioAPI.put(`/${id.value}/`, updatedValue)
    } catch (e) {
        alert("error");
        console.log(e);
    }
    loading.value = false;
}

async function load(id) {
    loading.value = true;
    try {
        const response = await StudioMgmtAPI.get('/' + id);
        studio.value = response.data;
    } catch (e) {
        console.warn(e);
    }
    loading.value = false;
}
onMounted(() => {
    id.value = route.params.id;
    load(route.params.id);
})
</script>
<template>
    <v-toolbar color="surface" elevation="1" height="84">
        <template #title>
            <h2 class="text-headline-large font-weight-bold">Edit Studio</h2>
        </template>
        <v-btn variant="flat" @click="$router.back()"> Voltar</v-btn>
    </v-toolbar>
    <div class="d-flex flex-row mt-8">
        <cp-loading variant="full" v-if="loading" />
    <v-row>
      <v-col cols="2">
        <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab prepend-icon="mdi-account" text="Studio" value="studioInfo"></v-tab>
            <v-tab prepend-icon="mdi-lock" text="Lessons" value="lessons"></v-tab>
            <v-tab prepend-icon="mdi-access-point" text="Sessions" value="sessions"></v-tab>
        </v-tabs>

      </v-col>

      <v-col cols="10">
        <v-tabs-window v-model="tab" grow>
            <v-tabs-window-item value="studioInfo">
                <div class="d-block " style="width: 100%">
                <StudioForm v-if="studio" :studio="studio" @submit="saveStudio" />
                </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="lessons">
                <v-card flat>
                    <v-card-text>
                        <p>
                            Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis
                            tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris
                            ipsum
                            aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non,
                            euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                        </p>

                        <p>
                            Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
                            convallis
                            tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper,
                            ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea
                            dictumst.
                            Fusce ac felis sit amet ligula pharetra condimentum.
                        </p>

                        <p>
                            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a
                            libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae
                            tortor. Aliquam eu nunc.
                        </p>

                        <p>
                            Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra
                            rhoncus
                            pede. Duis leo. Fusce fermentum odio nec arcu.
                        </p>

                        <p class="mb-0">
                            Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget,
                            vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis,
                            dictum
                            sed, iaculis a, condimentum nec, nisi.
                        </p>
                    </v-card-text>
                </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="sessions">
                <v-card flat>
                    <v-card-text>
                        <p>
                            Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin
                            viverra,
                            ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac
                            eros.
                            In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                        </p>

                        <p class="mb-0">
                            Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta
                            a,
                            auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                            sem. Nam at tortor in tellus interdum sagittis.
                        </p>
                    </v-card-text>
                </v-card>
            </v-tabs-window-item>
        </v-tabs-window>
        </v-col>
        </v-row>
        <!-- <v-layout full-height>
        <v-navigation-drawer permanent color="surface" elevation="1">
            <v-list color="transparent">
                <v-list-item prepend-icon="mdi-view-dashboard" title="Studio"></v-list-item>
                <v-list-item prepend-icon="mdi-account-box" title="Lessons"></v-list-item>
                <v-list-item prepend-icon="mdi-gavel" title="Sessions"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <div class="pa-4">
            <StudioForm v-else :studio="studio" @submit="saveStudio" />
        </div>
    </v-layout> -->
    </div>
</template>