<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4 text-center">
            Welcome to rhythm∞
          </v-card-title>
          <v-card-subtitle class="text-center">
            Your dance plans, sorted!
          </v-card-subtitle>
          <v-card-text class="text-center">
            <p class="text-h6 mb-4">
              Digital organization platform for dancers
            </p>
            <v-row>
              <v-col cols="12" md="3" v-for="feature in features" :key="feature.title">
                <v-card outlined>
                  <v-card-text class="text-center">
                    <v-icon size="48" color="primary" class="mb-2">
                      {{ feature.icon }}
                    </v-icon>
                    <div class="text-h6">{{ feature.title }}</div>
                    <div class="text-body-2">{{ feature.description }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Events',
    description: 'Manage your dance events and competitions',
    icon: 'mdi-calendar-multiple'
  },
  {
    title: 'Groups',
    description: 'Organize your dance groups and teams',
    icon: 'mdi-account-group'
  },
  {
    title: 'Training',
    description: 'Track your training sessions and progress',
    icon: 'mdi-dumbbell'
  },
  {
    title: 'Travel',
    description: 'Plan your dance-related travels',
    icon: 'mdi-airplane'
  }
]
</script>