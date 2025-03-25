import axios from 'axios'
/**
 * Creates an Axios instance with a specified base URL and default configuration.
 *
 * @param {string} baseURL - The base URL for the Axios instance.
 * @returns {import('axios').AxiosInstance} A configured Axios instance.
 *
 * The Axios instance is pre-configured with the following:
 * - `baseURL`: The base URL for all requests made with this instance.
 * - `headers`: Default headers including `Accept` and `Content-Type` set to `application/json`.
 * - `withCredentials`: Set to `true` to include credentials in cross-site requests.
 */
const instance = (baseURL) =>{ 
  return axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
}

export default instance