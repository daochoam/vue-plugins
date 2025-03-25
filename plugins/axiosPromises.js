/**
 * Vue.js plugin to handle multiple Axios promises and return their results.
 * 
 * @module axiosPromises
 * @param {Object} app - The Vue application instance.
 * 
 * @property {Function} app.config.globalProperties.$axiosPromises - A method to handle multiple promises.
 * @param {Array<Promise>} requests - An array of promises to be resolved.
 * @returns {Promise<Array<*>>} A promise that resolves to an array of results. 
 * Each result is the value of a fulfilled promise or `null` if the promise was rejected.
 * 
 * @example
 * this.$axiosPromises([axios.get('/api/endpoint1'), axios.get('/api/endpoint2')])
 *   .then((results) => {
 *     console.log(results); // Array of results or null for rejected promises
 *   });
 */
export default {
  install(app) {
    app.config.globalProperties.$axiosPromises = async (requests) => {
      const results = await Promise.allSettled([...requests])

      results.forEach((result) => {
        if (result.status === 'rejected') {
          console.info('Error en una petición:', result.reason)
        }
      })

      return results.map((r) => (r.status === 'fulfilled' ? r.value : null))
    }
  },
}