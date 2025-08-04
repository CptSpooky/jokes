<template>
  <v-bottom-navigation v-model="routeIndex" color="primary" active>
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

const routeIndex = ref(0)
const router = useRouter()
const route = useRoute()

const routeToIndex: Record<string, number> = {
  '/': 0,
  '/users': 1,
}

watch(
  () => route.path,
  (path) => {
    routeIndex.value = routeToIndex[path] ?? 0
  },
  { immediate: true }
)
</script>