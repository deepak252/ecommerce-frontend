const ACCESS_TOKEN_KEY = 'access_token'

export const saveAccessToken = (token?: string) => {
  if (!token) return
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}
