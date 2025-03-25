/**
 * Vue.js plugin to manage theme-related configurations such as colors, breakpoints, and layout direction (RTL/LTR).
 * 
 * @type {Object}
 * @property {Function} install - The install method for the plugin, which sets up theme variables and layout direction.
 * 
 * @param {Object} app - The Vue application instance.
 * @param {Object} app.config.globalProperties - The global properties of the Vue application.
 * @param {Object} app.config.globalProperties.$themeConfig - The theme configuration object.
 * @param {Object} app.config.globalProperties.$themeConfig.layout - The layout configuration object.
 * @param {boolean} app.config.globalProperties.$themeConfig.layout.isRTL - Indicates if the layout is in RTL (right-to-left) mode.
 * 
 * @description
 * - Extracts theme colors and breakpoints from CSS custom properties and makes them globally available in the Vue app.
 * - Sets the document's `dir` attribute to "rtl" or "ltr" based on the theme configuration.
 * - Provides `$themeColors` and `$themeBreakpoints` as global properties for easy access throughout the app.
 */
export default {
  install(app) {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
    const $themeColors = {}
    const $themeBreakpoints = {}

    // Set colors in theme
    const computedStyles = getComputedStyle(document.documentElement)
    colors.forEach(color => {
      $themeColors[color] = computedStyles.getPropertyValue(`--${color}`).trim()
    })

    // Set Theme Breakpoints
    breakpoints.forEach(bp => {
      const value = computedStyles.getPropertyValue(`--breakpoint-${bp}`).trim()
      $themeBreakpoints[bp] = Number(value.slice(0, -2))
    })

    // Set RTL
    const { isRTL } = app.config.globalProperties.$themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')

    // Provide theme variables globally
    app.config.globalProperties.$themeColors = $themeColors
    app.config.globalProperties.$themeBreakpoints = $themeBreakpoints
  },
}