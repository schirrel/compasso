<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const items = [
  {
    text: 'Home',
    path: '/'
  },
  {
    text: 'Studios',
    path: '/studios'
  }
]
const goTo = (path) => {
    router.push({ path })
}
</script>

<template>
        <v-app>
           <v-layout>
    <v-app-bar class="px-md-4" color="surface-variant" flat>
      <v-app-bar-title>Compasso</v-app-bar-title>
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="me-2 text-none"
          slim
          @click="goTo(item.path)"
         :text="item.text"
        />
      </template>

      <v-spacer />

      <template #append>
        <v-btn
          class="ms-1 opacity-60"
          icon="mdi-bell-outline"
        />

        <v-btn class="ms-1" icon>
          <v-avatar>
            <v-icon icon="mdi-user"></v-icon>
          </v-avatar>

          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="Sign out" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$vuetify.display.smAndDown"
      v-model="drawer"
      location="top"
      temporary
      width="355"
    >
      <v-list class="py-0" slim>
        <v-list-item link prepend-icon="mdi-home-outline" title="Dashboard" />

        <v-list-group
          prepend-icon="mdi-account-multiple-outline"
          title="Customers"
        >
          <template #activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" />
          </template>

          <v-list-item
            link
            prepend-icon="mdi-account-plus-outline"
            title="Create New"
          />

          <v-list-group prepend-icon="mdi-magnify" title="Search">
            <template #activator="{ props: activatorProps }">
              <v-list-item v-bind="activatorProps" />
            </template>

            <v-list-item
              link
              prepend-icon="mdi-account-outline"
              title="By Name"
            />

            <v-list-item
              link
              prepend-icon="mdi-email-outline"
              title="By Email"
            />

            <v-list-item
              link
              prepend-icon="mdi-phone-outline"
              title="By Phone"
            />
          </v-list-group>
        </v-list-group>

        <v-list-item link prepend-icon="mdi-calendar" title="Calendar" />

        <v-list-item link prepend-icon="mdi-poll" title="Analytics" />

        <v-divider />

        <v-list-item link prepend-icon="mdi-inbox-outline" title="Inbox" />

        <v-list-item
          link
          prepend-icon="mdi-bell-outline"
          title="Notifications"
        />

        <v-divider />

        <v-list-item
          lines="two"
          link
          prepend-avatar="https://vuetifyjs.b-cdn.net/docs/images/avatars/planetary-subscriber.png"
          subtitle="Vuetify Engineer"
          title="John Leider"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-layout>
        </v-app>
</template>
