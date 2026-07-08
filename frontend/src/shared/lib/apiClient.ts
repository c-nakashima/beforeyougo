const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function apiClient<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  const response = await fetch(url, {
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${url} - ${errorText}`,
    )
  }

  return response.json()
}
