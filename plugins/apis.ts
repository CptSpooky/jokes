/**
 * @description Inject APIs from our services into the Nuxt app.
*/
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createApi } from '@/services/createApi'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const experienceApi = createApi(config.public.ExperienceApiUrl, {
    // 'x-api-key': config.public.ApiKey,
  })

  const authApi = createApi(config.public.AuthApiUrl, {
    // Authorization: `Bearer ${config.public.AdminToken}`,
  })

  nuxtApp.provide('experienceApi', experienceApi)
  nuxtApp.provide('authApi', authApi)
})