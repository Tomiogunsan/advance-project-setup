import axios, { AxiosInstance, AxiosRequestConfig, Cancel } from 'axios'
import {
  ApiRequestConfig,
  WithAbortFn,
  ApiExecutor,
  ApiExecutorArgs,
  ApiError,
} from './api.types'

const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/',
}

const axiosInstance = axios.create(axiosParams)

export const didAbort = (
  error: unknown
): error is Cancel & { aborted: boolean } => axios.isCancel(error)

const getCancelSource = () => axios.CancelToken.source()
export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error)
}

const withAbort = <T>(fn: WithAbortFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig
    // Extract abort property from the config
    const { abort, ...config } = originalConfig
    // Create cancel token and abort method only if abort // function was passed
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource()
      config.cancelToken = token
      abort(cancel)
    }
    try {
      if (args.length > 2) {
        const [url, body] = args
        return await fn<T>(url, body, config)
      } else {
        const [url] = args
        return await fn<T>(url, config)
      }
    } catch (error) {
      console.log('api error', error)
      // Add "aborted" property to the error if the request was cancelled
      if (didAbort(error)) {
        error.aborted = true
      }
      throw error
    }
  }
}
// Main api function
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  }
}

/**
 * The function returns an object with methods for making HTTP requests using Axios, with optional
 * configuration and abort functionality.
 * @param {AxiosInstance} axios - `axios` is an instance of the Axios library, which is used to make
 * HTTP requests. It is passed as a parameter to the `api` function.
 * @returns A function that returns an object with methods for making HTTP requests using Axios, with
 * support for aborting requests. The methods available are `get`, `delete`, `post`, `patch`, and
 * `put`.
 */
// const api = (axios: AxiosInstance) => {
//   return {
//     get: <T>(url: string, config: ApiRequestConfig = {}) =>
//       withAbort<T>(axios.get)(url, config),
//     delete: <T>(url: string, config: ApiRequestConfig = {}) =>
//       withAbort<T>(axios.delete)(url, config),
//     post: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
//       withAbort<T>(axios.post)(url, body, config),
//     patch: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
//       withAbort<T>(axios.patch)(url, body, config),
//     put: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
//       withAbort<T>(axios.put)(url, body, config),
//   }
// }

export default api(axiosInstance)
