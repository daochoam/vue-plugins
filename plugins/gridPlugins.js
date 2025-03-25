/**
 * A Vue.js plugin that provides utility functions for generating Tailwind CSS grid and flexbox classes.
 * This plugin adds two global properties `$cols` and `$flex` to the Vue app instance.
 * 
 * Note: This plugin requires Tailwind CSS to be installed and configured in your project.
 * 
 * @module gridPlugins
 * 
 * @function install
 * @param {Object} app - The Vue application instance.
 * 
 * @property {Function} $cols - Generates Tailwind CSS grid classes based on the number of columns or a custom column width.
 * @param {number} cols - The number of columns or a custom column width in pixels.
 * @returns {string} A string of Tailwind CSS classes for grid layout.
 * 
 * - Predefined column mappings:
 *   - `0`: No grid classes.
 *   - `1`: Single column grid.
 *   - `2`: Two-column grid for large screens.
 *   - `3`: Three-column grid for large screens, two for small screens.
 *   - `4`: Four-column grid for extra-large screens, three for medium screens, two for small screens.
 *   - `5`: Five-column grid for extra-large screens, three for large screens, two for small screens.
 *   - `6`: Six-column grid for extra-large screens, five for large screens, three for medium screens.
 *   - `7`: Seven-column grid for extra-large screens, five for large screens, three for medium screens.
 *   - `8`: Eight-column grid for extra-large screens, four for large screens, three for medium screens.
 * 
 * - Custom column width:
 *   If `cols` is a number greater than 100, it generates a responsive grid layout with columns of a minimum width equal to the specified value in pixels.
 * 
 * @property {Function} $flex - Generates Tailwind CSS flexbox classes based on the specified flex behavior.
 * @param {string} flex - The flex behavior or breakpoint-specific flex direction.
 * @returns {string} A string of Tailwind CSS classes for flexbox layout.
 * 
 * - Predefined flex mappings:
 *   - `'wrap'`: Enables wrapping of flex items.
 *   - `'nowrap'`: Disables wrapping of flex items.
 *   - `'flex-xs'`: Flex direction column by default, row for extra-small screens.
 *   - `'flex-sm'`: Flex direction column by default, row for small screens.
 *   - `'flex-md'`: Flex direction column by default, row for medium screens.
 *   - `'flex-lg'`: Flex direction column by default, row for large screens.
 *   - `'flex-xl'`: Flex direction column by default, row for extra-large screens.
 */
export default {
  install(app) {
    app.config.globalProperties.$cols = (cols) => {
      const gridMap = {
        0: '',
        1: 'grid-cols-1',
        2: 'grid-cols-1 lg:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6',
        7: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7',
        8: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8',
      };
      if (gridMap[cols]) return `grid ${gridMap[cols]} items-center gap-4 my-4`
      return cols => 100 ? `grid grid-cols-[repeat(auto-fit,_minmax(${cols}px,_1fr))] items-center gap-4 my-4`:''
    };

    app.config.globalProperties.$flex = (flex) => {
      const flexMap = {
        'wrap': 'flex-wrap',
        'nowrap': 'flex-nowrap',
        'flex-xs': 'flex-col xs:flex-row',
        'flex-sm': 'flex-col sm:flex-row',
        'flex-md': 'flex-col md:flex-row',
        'flex-lg': 'flex-col lg:flex-row',
        'flex-xl': 'flex-col xl:flex-row',
      };
      return `flex ${flexMap[flex]} items-center gap-4 my-4`;
    };
  },
};
