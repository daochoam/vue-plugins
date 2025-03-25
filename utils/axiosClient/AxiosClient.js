
import axios from './axios';
/**
 * A utility class for handling HTTP requests using Axios. This class simplifies 
 * the process of making API requests (GET, POST, PUT, DELETE) and includes 
 * setup for request and response interceptors to manage authorization and error handling.
 *
 * The class also supports automatic authentication handling via the session 
 * storage and attaches the Bearer token in the headers if the user is authenticated.
 *
 * @class AxiosClient
 * @constructor
 * @param {string} baseURL - The base URL for the API that the client will interact with.
 *
 * @method #get
 * Performs a GET request to the specified URL.
 * 
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} [config={}] - Optional configuration object to pass additional parameters (headers, params).
 * @returns {Promise<Object>} A promise that resolves to the response data.
 *
 * @method #post
 * Performs a POST request to the specified URL with the provided data.
 * 
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to send in the POST request body.
 * @param {Object} [config={}] - Optional configuration object for additional parameters.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 *
 * @method #put
 * Performs a PUT request to the specified URL with the provided data.
 * 
 * @param {string} url - The URL to send the PUT request to.
 * @param {Object} data - The data to send in the PUT request body.
 * @param {Object} [config={}] - Optional configuration object for additional parameters.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 *
 * @method #delete
 * Performs a DELETE request to the specified URL.
 * 
 * @param {string} url - The URL to send the DELETE request to.
 * @param {Object} [config={}] - Optional configuration object for additional parameters.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 */
class AxiosClient {
  constructor(baseURL) {
    this.axiosInstance = axios.create({ baseURL })
    this.#setupInterceptors();
  }

  #setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const authData = JSON.parse(sessionStorage.getItem('auth') || '{}');
        const authenticated = authData?.authenticated;
        const token = authData?.token;
        const pathName = router?.currentRoute?.value?.path;

        if (pathName !== SESSION_NOT_COOKIE && !authenticated) {
          router.push(SESSION_NOT_COOKIE)
        }
        if (authenticated) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return { status: response.status, data: response.data, message: response?.message };
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get(url, config = {}) {
    return this.axiosInstance.get(url, config);
  }

  async post(url, data, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }

  async put(url, data, config = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  async delete(url, config = {}) {
    return this.axiosInstance.delete(url, config);
  }
}

export default AxiosClient;