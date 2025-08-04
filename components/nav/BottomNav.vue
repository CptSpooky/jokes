<template>
  <v-bottom-navigation v-model="value" color="primary" active>
    <v-btn @click="router.push('/')">
      <v-icon>mdi-emoticon-happy-outline</v-icon>
      Jokes
    </v-btn>
    <v-btn @click="router.push('/users')">
      <v-icon>mdi-account-outline</v-icon>
      Users
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const value = ref(0)
const router = useRouter()
const route = useRoute()

const routeToIndex = {
  '/': 0,
  '/users': 1,
}

watch(
  () => route.path,
  (path) => {
    value.value = routeToIndex[path] ?? 0
  },
  { immediate: true }
)
</script>