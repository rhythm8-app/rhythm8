<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>rhythm∞</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn
        v-for="item in navigation"
        :key="item.title"
        :to="item.to"
        text
      >
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const navigation = [
  { title: 'Dashboard', to: '/' },
  { title: 'Events', to: '/events' },
  { title: 'Groups', to: '/groups' },
  { title: 'Training', to: '/training' },
  { title: 'Travel', to: '/travel' }
]
</script>