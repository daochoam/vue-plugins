import { defineAsyncComponent } from 'vue'
const components = import.meta.globEager('@/components/**/*.vue')

/**
 * 
 * A Vue.js plugin that globally registers all Vue components found in a specified folder.
 * The components are loaded eagerly using Vite's `import.meta.globEager`.
 *
 * @fileoverview This plugin scans the `@/components` directory for `.vue` files
 * and registers them globally in the Vue application.
 *
 * @requires vue
 *
 * @example
 * // Register the plugin in your Vue app
 * import GlobalComponentPlugin from './plugins/globalComponent'
 * const app = createApp(App)
 * app.use(GlobalComponentPlugin)
 *
 * @module GlobalComponentPlugin
 */
export default {
  install(app) {
    for (const path in components) {
      const component = defineAsyncComponent(components[path])
      const componentName = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '') 
      
      app.component(componentName, component.default || component)
    }
  },
}
