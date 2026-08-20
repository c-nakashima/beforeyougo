const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL

if (!configuredApiUrl && process.env.NODE_ENV === 'production') {
  throw new Error('NEXT_PUBLIC_API_URL must be set in production.')
}

const API_BASE_URL = configuredApiUrl ?? 'http://127.0.0.1:8000/api/backend'

export async function apiClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  // Set header
  const headers = new Headers(options.headers)
  if (typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${url} - ${errorText}`,
    )
  }

  return response.json()
}
