<script setup>
import { ref, toRaw, defineEmits, defineProps } from 'vue'

const loading = ref(false);

const props = defineProps({
    studio: Object
})

const emits = defineEmits(['submit'])
const studio = ref(props.studio ?? {
  name: '',
  address: '',
  city: '',
  state: '',
  site: '',
  instagram: '',
  phone: '',
  email: ''
})

const rules = {
  name: [
    value => {
      if (!value) return 'Name is required.'
      if (value?.length >= 3) return true
      return 'Studio name must be at least 3 characters.'
    },
  ],
  address: [
    value => {
      if (!value) return 'Address is required.'
      if (value?.length >= 5) return true
      return 'Address name must be at least 5 characters.'
    }
  ],
  city: [
    value => {
      if (!value) return 'City is required.'
      if (/[^0-9]/.test(value)) return true
      return 'City can not contain digits.'
    },
  ],
  state: [
    value => {
      if (!value) return 'State is required.'
      if (value?.length === 2) return true
      return 'State must be 2 letter only, the acronym.'
    }
  ],
  email: [
    value => {
      if (!value || /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$/.test(value)) return true
      return 'E-mail must have format as you@email.com'
    }
  ],
  phone: [
    value => {
      if (!value) return 'Phone is required.'
      return true
    }
  ],
}

const handleForm = () => {
    emits('submit', studio.value)
}
</script>

<template>
  <v-container class="mx-auto w-75">
    <v-form class="mx-auto w-100 flex-column d-flex ga-4" fast-fail @submit.prevent="handleForm">
      <v-card class="mx-auto  w-100 ">
        <v-card-item>
          <v-card-title>
            Studio
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="studio.name" :rules="rules.name" label="Name"></v-text-field></v-col>
            <v-col>
              <v-text-field v-model="studio.phone" type="number" :rules="rules.phone" label="Phone"></v-text-field></v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto  w-100 ">
        <v-card-item>
          <v-card-title>
            Location
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="studio.address" label="Address"></v-text-field>
            </v-col>
            <v-col><v-text-field v-model="studio.city" :rules="rules.city" label="City"></v-text-field></v-col>
            <v-col> <v-text-field v-model="studio.state" :rules="rules.state" label="State"></v-text-field></v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto  w-100 ">
        <v-card-item>
          <v-card-title>
            Social
          </v-card-title>
        </v-card-item>

        <v-card-text>
          
          <v-row>
            <v-col><v-text-field v-model="studio.email" :rules="rules.email" label="E-mail"></v-text-field> </v-col>
            <v-col><v-text-field v-model="studio.site" label="Site"></v-text-field></v-col>
            <v-col><v-text-field v-model="studio.instagram" label="Instagram"></v-text-field></v-col>
          </v-row>
          

          

          

        </v-card-text>
      </v-card>
      <v-btn class="mt-2 w-auto" type="submit" block :disabled="loading">Save</v-btn>
    </v-form>
  </v-container>
</template>