/**
 * @description Inject APIs from our services into the Nuxt app.
*/
import { defineNuxtPlugin } from '#app'
import { apiFetch } from '@/services/apiFetch'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('apiFetch', apiFetch)
})