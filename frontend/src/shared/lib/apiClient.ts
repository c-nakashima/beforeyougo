// Server-side requests use Vercel's internal service URL in production
// and local FastAPI during development.
// Browser requests use the same-origin Vercel rewrite in production
// and local FastAPI during development.
const INTERNAL_BACKEND_URL = (
  process.env.BACKEND_INTERNAL_URL ?? 'http://127.0.0.1:8000'
).replace(/\/$/, '')

const API_BASE_URL =
  typeof window === 'undefined'
    ? `${INTERNAL_BACKEND_URL}/api/backend`
    : process.env.NODE_ENV === 'production'
      ? '/api/backend'
      : 'http://127.0.0.1:8000/api/backend'

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
