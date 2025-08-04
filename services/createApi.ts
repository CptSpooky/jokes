/**
 * Create a configured API fetch client
 * @param baseUrl - Base URL of the API
 * @param defaultHeaders - Optional default headers (e.g. auth)
 * @description We can define our base configs for API calls here, then inject them in the apis.ts plugin. We'll also want to add them to useApis.ts in our composables.
 */
export type ApiFetchType = {
  get: <T = any>(url: string, options?: RequestInit) => Promise<T>
  post: <T = any>(url: string, body?: any, options?: RequestInit) => Promise<T>
  put: <T = any>(url: string, body?: any, options?: RequestInit) => Promise<T>
  delete: <T = any>(url: string, options?: RequestInit) => Promise<T>
}

export function createApi(
  baseUrl: string,
  defaultHeaders: HeadersInit = {}
): ApiFetchType {
  const handleFetch = async <T>(
    url: string,
    method: string,
    body?: any,
    options: RequestInit = {}
  ): Promise<T> => {
    const fullUrl = baseUrl + url

    const headers = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...(options.headers || {}),
    }

    const res = await fetch(fullUrl, {
      method,
      ...options,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      throw new Error(`apiFetch error: ${res.status} - ${res.statusText}`)
    }

    return res.json()
  }

  return {
    get: (url, options) => handleFetch(url, 'GET', undefined, options),
    post: (url, body, options) => handleFetch(url, 'POST', body, options),
    put: (url, body, options) => handleFetch(url, 'PUT', body, options),
    delete: (url, options) => handleFetch(url, 'DELETE', undefined, options),
  }
}