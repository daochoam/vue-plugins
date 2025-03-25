import { SESSION_NOT_COOKIE } from '@/const/const';
import router from '@/router';
import { ref } from 'vue';

/**
 * A utility class to simplify handling HTTP requests using the Fetch API. 
 * This class manages the request lifecycle, including loading state, error handling, 
 * and automatic token management for authenticated requests.
 * It also supports canceling ongoing requests by using the `AbortController`.
 *
 * @class FetchClient
 * @constructor
 *
 * @method fetchData
 * Creates a function for performing a fetch request with the specified HTTP method (GET, POST, etc.).
 * It handles authentication, loading, and error states, as well as aborting previous requests if needed.
 *
 * @param {string} method - The HTTP method to use for the request (e.g., 'GET', 'POST').
 * @returns {Function} A function that performs the fetch request.
 * 
 * @returns {Promise<Object>} An object containing `data`, `error`, and `loading` states.
 * 
 * @example
 * const fetchClient = new FetchClient();
 * const { data, error, loading } = await fetchClient.fetchData('GET')('/api/endpoint', { key: 'value' });
 */
class FetchClient {
  constructor() {
    this.data = ref(null);
    this.error = ref(null);
    this.loading = ref(false);
    this.controller = null;
  }

  fetchData(method) {
    return async (url, params = {}, bodyData = null) => {
      this.loading.value = true;
      this.error.value = null;
      this.data.value = null;

      // Cancelar solicitud anterior si existe
      if (this.controller) {
        this.controller.abort();
      }
      this.controller = new AbortController();

      try {
        // Obtener token de sessionStorage
        const authData = JSON.parse(sessionStorage.getItem('auth') || '{}');
        const token = authData?.token;

        if (!token && router.currentRoute.value.path !== SESSION_NOT_COOKIE) {
          router.push(SESSION_NOT_COOKIE);
          throw new Error('No autenticado');
        }

        // Configurar Headers
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        // Construir URL con Query Params
        const queryParams = new URLSearchParams(params).toString();
        const fullUrl = queryParams ? `${url}?${queryParams}` : url;

        // Configurar opciones de fetch
        const fetchOptions = {
          method,
          headers,
          signal: this.controller.signal,
          ...(bodyData ? { body: JSON.stringify(bodyData) } : {}),
        };

        const response = await fetch(fullUrl, fetchOptions);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        this.data.value = await response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          console.warn('Solicitud cancelada:', err.message);
        } else {
          this.error.value = err;
        }
      } finally {
        this.loading.value = false;
      }

      return {
        data: this.data.value,
        error: this.error.value,
        loading: this.loading.value,
      };
    };
  }
}

export default FetchClient;
