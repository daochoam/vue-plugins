import { useCssVar } from '@vueuse/core'
/**
 * Vue plugin to manage theme-related variables such as colors, breakpoints, and layout direction (RTL/LTR).
 * This plugin uses `@vueuse/core`'s `useCssVar` to fetch CSS variables and provides them globally
 * to the Vue application through `app.config.globalProperties`.
 *
 * @module useThemePlugin
 * @requires @vueuse/core
 *
 * @example
 * // Install the plugin in your Vue app
 * import useThemePlugin from './plugins/useThemePlugin'
 * const app = createApp(App)
 * app.use(useThemePlugin)
 *
 * @property {Object} $themeColors - An object containing theme colors fetched from CSS variables.
 * @property {string} $themeColors.primary - Primary color value.
 * @property {string} $themeColors.secondary - Secondary color value.
 * @property {string} $themeColors.success - Success color value.
 * @property {string} $themeColors.info - Info color value.
 * @property {string} $themeColors.warning - Warning color value.
 * @property {string} $themeColors.danger - Danger color value.
 * @property {string} $themeColors.light - Light color value.
 * @property {string} $themeColors.dark - Dark color value.
 *
 * @property {Object} $themeBreakpoints - An object containing theme breakpoints fetched from CSS variables.
 * @property {number} $themeBreakpoints.xs - Extra small breakpoint value in pixels.
 * @property {number} $themeBreakpoints.sm - Small breakpoint value in pixels.
 * @property {number} $themeBreakpoints.md - Medium breakpoint value in pixels.
 * @property {number} $themeBreakpoints.lg - Large breakpoint value in pixels.
 * @property {number} $themeBreakpoints.xl - Extra large breakpoint value in pixels.
 *
 * @property {boolean} isRTL - Indicates whether the layout direction is Right-to-Left (RTL).
 *
 * @param {Object} app - The Vue application instance.
 */
export default {
  install(app) {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']
    const $themeColors = {}
    const $themeBreakpoints = {}

    // Set colors in theme
    colors.forEach(color => {
      $themeColors[color] = useCssVar(`--${color}`, document.documentElement).value.trim()
    })

    // Set Theme Breakpoints
    breakpoints.forEach(bp => {
      $themeBreakpoints[bp] = Number(useCssVar(`--breakpoint-${bp}`, document.documentElement).value.slice(0, -2))
    })

    // Set RTL
    const { isRTL } = app.config.globalProperties.$themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')

    // Provide theme variables globally
    app.config.globalProperties.$themeColors = $themeColors
    app.config.globalProperties.$themeBreakpoints = $themeBreakpoints
  },
}
