/**
 * @description We can define our base configs for API calls here, then inject them in the apis.ts plugin.
*/

import { useRuntimeConfig } from '#app'
export type ApiFetchType = (url: string, options?: RequestInit) => Promise<any>

export const apiFetch: ApiFetchType = async (url, options = {}) => {
  const config = useRuntimeConfig()
  const fullUrl = config.public.ApiUrl + url

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!res.ok) throw new Error(`apiFetch error: ${res.statusText}`)
  return res.json()
}