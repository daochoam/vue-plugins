import FetchClient from '@/utils/axiosClient/FetchClient';
/**
 * Vue.js plugin to integrate a fetch utility into the global properties of the application.
 * 
 * @module fetchPlugin
 * 
 * @requires @/utils/axiosClient/FetchClient
 * 
 * @example
 * // Register the plugin in your Vue application
 * import fetchPlugin from './plugins/fetchPlugin';
 * const app = createApp(App);
 * app.use(fetchPlugin);
 * 
 * @property {Function} $useFetch - A global property added to the Vue app instance.
 * Allows making fetch requests using the FetchClient utility.
 * 
 * @param {Object} app - The Vue application instance.
 * @param {Function} app.config.globalProperties.$useFetch - A method to fetch data using the FetchClient.
 * @param {string} method - The HTTP method to use for the fetch request (e.g., 'GET', 'POST').
 * 
 * @returns {void}
 */
export default {
  install(app) {
    app.config.globalProperties.$useFetch = (method) => FetchClient.fetchData(method);
  },
};
