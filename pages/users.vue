<template>
  <v-container>
    <v-row class="my-4">
      <v-col cols="12">
        <h1 class="text-center">Just users</h1>
        <p class="text-center">We're testing them api injections</p>
        <v-alert v-if="errorMessage" type="error" class="my-4">
          {{ errorMessage }}
        </v-alert>
        <v-row v-if="loading" class="justify-center pt-2" dense>
          <v-col cols="12" sm="6" md="4">
            <v-progress-linear indeterminate rounded />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-card v-for="user in users" :key="user.id" class="mx-auto my-12" width="374" elevated>
            <v-card-item>
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-subtitle>{{ user.email }}</v-card-subtitle>
              <v-card-text class="pr-0 pl-0">{{ user.phone }}</v-card-text>
            </v-card-item>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';

const usersStore = useUsersStore();
const { loading, users, errorMessage } = storeToRefs(usersStore);
const { fetchUsers } = usersStore;

onMounted(async () => {
  await fetchUsers();
});
</script>