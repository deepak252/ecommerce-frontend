import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { call } from 'redux-saga/effects'
import { API_BASE_URL } from '@/constants/environment'
import { getAccessToken } from '@/utils/storage'

const api = axios.create({
  baseURL: API_BASE_URL,
})

type RequestConfig = AxiosRequestConfig & {
  data?: Record<string, any>
  headers?: Record<string, string>
}

const getAuthHeader = (
  headers: Record<string, string>
): Record<string, string> => {
  const accessToken = getAccessToken()
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    }
  }
  return headers
}

export const setupInterceptor = (navigate?: (path: string) => void): void => {
  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response?.status
      if (statusCode === 401) {
        // removeUserFromStorage();
        navigate?.('/auth/login')
      }
      return Promise.reject(error)
    }
  )
}

const makeRequest = async <T = any>(
  method: AxiosRequestConfig['method'],
  endpoint: string,
  { headers = {}, ...args }: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> => {
  headers = getAuthHeader(headers)

  return api
    .request({
      method: method,
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      ...args,
    })
    .then((response) => response)
    .catch((error) => error.response)
}

export const getRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('get', endpoint, config)

export const postRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('post', endpoint, config)

export const putRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('put', endpoint, config)

export const deleteRequest = <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<AxiosResponse<T> | undefined> =>
  makeRequest<T>('delete', endpoint, config)

/**
 * Upload task generator function.
 * Handles an HTTP POST request with support for cancellation and callbacks.
 *
 * @param endpoint - The API endpoint.
 * @param config - Axios request configuration including `signal` for cancellation.
 * @param cb - Callback function for handling success and error.
 */
export function* uploadTask<T = any>(
  endpoint: string = '',
  config: RequestConfig = {},
  cb: (success: T | null, error: any | null) => void = () => {}
): Generator<any, void, AxiosResponse<T>> {
  try {
    const response: AxiosResponse<T> = yield call(postRequest, endpoint, config)

    if (response && response.status >= 200 && response.status < 300) {
      yield call(cb, response.data, null)
    } else if (!config.signal?.aborted) {
      // Handle non-cancelled unsuccessful responses
      throw response.data || response
    }
  } catch (error) {
    console.error('Upload task error:', error)
    yield call(cb, null, error)
  }
}

// const api = axios.create({
//   baseURL: API_BASE_URL,
// })

// export const setupInterceptor = (navigate?: any) => {
//   api.interceptors.request.use(
//     (config) => config,
//     (error) => Promise.reject(error)
//   )

//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       // console.log(error.config.url);
//       const statusCode = error.response?.status
//       if (statusCode === 401) {
//         // removeUserFromStorage()
//         navigate?.('/auth/login')
//       }
//       return Promise.reject(error)
//     }
//   )
// }

// export const getRequest = async (
//   endpoint: string = '',
//   { headers = {}, ...args }: AxiosRequestConfig = {}
// ) => {
//   const accessToken = getAccessToken()
//   if (accessToken) {
//     headers = {
//       Authorization: `Bearer ${accessToken}`,
//       ...headers,
//     }
//   }
//   return api
//     .get(endpoint, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       ...args,
//     })
//     .then((response) => response)
//     .catch((error) => error.response)
// }

// export const postRequest = async (
//   endpoint = '',
//   { data, headers = {}, ...args }: AxiosRequestConfig = {}
// ) => {
//   const accessToken = getAccessToken()
//   if (accessToken) {
//     headers = {
//       Authorization: `Bearer ${accessToken}`,
//       ...headers,
//     }
//   }
//   return api
//     .post(endpoint, data, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       ...args,
//     })
//     .then((response) => response)
//     .catch((error) => error.response)
// }

// export const putRequest = async (
//   endpoint = '',
//   { data, headers = {}, ...args }: AxiosRequestConfig = {}
// ) => {
//   const accessToken = getAccessToken()
//   if (accessToken) {
//     headers = {
//       Authorization: `Bearer ${accessToken}`,
//       ...headers,
//     }
//   }
//   return api
//     .put(endpoint, data, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       ...args,
//     })
//     .then((response) => response)
//     .catch((error) => error.response)
// }

// export const deleteRequest = async (
//   endpoint = '',
//   { data, headers = {}, ...args }: AxiosRequestConfig = {}
// ) => {
//   const accessToken = getAccessToken()
//   if (accessToken) {
//     headers = {
//       Authorization: `Bearer ${accessToken}`,
//       ...headers,
//     }
//   }
//   return api
//     .delete(endpoint, {
//       data,
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       ...args,
//     })
//     .then((response) => response)
//     .catch((error) => error.response)
// }
