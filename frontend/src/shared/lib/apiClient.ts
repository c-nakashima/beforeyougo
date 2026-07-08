const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiClient<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not set')
  }

  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error('API request failed')
  }

  return response.json()
}
