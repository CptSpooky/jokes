<template>
  <v-app>
    <v-main>
      <NuxtLoadingIndicator color="primary" />
      <BottomNav />
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import BottomNav from '@/components/nav/BottomNav.vue'
</script>

<style></style>