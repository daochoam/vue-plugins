import { URL_BACK } from '@/const/const';
import { ref } from 'vue';
import AxiosClient from './AxiosClient';

/**
 * A utility class for managing HTTP requests with Axios, providing methods to handle requests,
 * manage their loading states, store the response data, handle errors, and support request cancellation.
 *
 * This class allows asynchronous data fetching using various HTTP methods and can handle request cancellation 
 * using an AbortController instance.
 *
 * @class FetchClient
 * @constructor
 *
 * @method #fetchData
 * Creates a function to perform an HTTP request with the specified method (GET, POST, etc.).
 * This method returns a function that performs the request and handles loading, error, and response states.
 * It also supports cancellation of previous requests.
 * 
 * @param {string} method - The HTTP method to be used (e.g., 'GET', 'POST').
 * @returns {Function} A function that accepts `url`, `params`, and `bodyData` as arguments to perform the HTTP request.
 * 
 * @method #cancelRequest
 * Cancels the ongoing HTTP request, if any, by calling the `abort` method on the AbortController.
 * 
 * @method #getState
 * Returns the current state of the request, including `data`, `error`, and `loading`.
 * 
 * @returns {Object} An object containing `data`, `error`, and `loading` values.
 */
class FetchClient {
  static data = ref(null);
  static error = ref(null);
  static loading = ref(false);
  static controller = null;
  static axiosClient = new AxiosClient(URL_BACK);

  static async fetchData(method) {
    return async (url, params = {}, bodyData = null) => {
      this.loading.value = true;
      this.error.value = null;
      this.data.value = null;

      if (this.controller) {
        this.controller.abort();
      }
      this.controller = new AbortController();

      try {
        const response = await this.axiosClient[method.toLowerCase()](url, method === 'GET' ? { params } : bodyData, {
          signal: this.controller.signal,
        });

        this.data.value = response.data;
      } catch (err) {
        if (err.name === 'CanceledError') {
          console.warn('Solicitud cancelada:', err.message);
        } else {
          this.error.value = err;
        }
      } finally {
        this.loading.value = false;
      }

      return this.getState();
    };
  }

  static cancelRequest() {
    if (this.controller) {
      this.controller.abort();
      console.warn('Solicitud cancelada');
    }
  }

  static getState() {
    return {
      data: this.data.value,
      error: this.error.value,
      loading: this.loading.value,
    };
  }
}

export default FetchClient;
