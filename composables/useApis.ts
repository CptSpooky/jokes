/**
 * Nuxt 3 composable to provide access to APIs
 * @description This composable allows us to access the APIs injected in the Nuxt app.
 */
import type { ApiFetchType } from '@/services/createApi'

export function useApis() {
  const { $experienceApi, $authApi } = useNuxtApp()

  return {
    experienceApi: $experienceApi as ApiFetchType,
    authApi: $authApi as ApiFetchType,
  }
}