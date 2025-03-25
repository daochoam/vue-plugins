/**
 * A Vue.js plugin that provides a global `$timeOut` method for managing delayed execution with status tracking.
 *
 * @example
 * Usage in a Vue component:
 * this.$timeOut(1000, () => {
 *   console.log('Executed after 1 second');
 * });
 *
 * @type {Object}
 * @property {Function} install - The install method for the Vue plugin.
 * @param {Object} app - The Vue application instance.
 * @property {Function} app.config.globalProperties.$timeOut - A method to execute a callback after a specified delay.
 * @param {number} delay - The delay in milliseconds before executing the callback.
 * @param {Function} callback - The function to execute after the delay.
 * @returns {Function} A function to cancel the timeout. When called, it clears the timeout and returns an object with the status `cancelled`.
 *
 * @example
 * Canceling a timeout:
 * const cancel = this.$timeOut(2000, () => {
 *   console.log('This will not be logged if canceled');
 * });
 * cancel(); // Cancels the timeout
 */
export default {
  install(app) {
    app.config.globalProperties.$timeOut = (delay, callback) => {
      let status = 'pending';
      const timerId = setTimeout(() => {
        try {
          const data = callback();
          status = 'fulfilled';
          return { status, data };
        } catch (error) {
          status = 'rejected';
          return { status, error };
        }
      }, delay);

      return () => {
        clearTimeout(timerId);
        status = 'cancelled';
        return { status };
      };
    };
  },
};