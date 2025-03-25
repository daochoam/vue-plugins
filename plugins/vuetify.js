import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa, aliases as faAliases } from 'vuetify/iconsets/fa'
import { md, aliases as mdAliases } from 'vuetify/iconsets/md'
import { mdi, aliases as mdiAliases } from 'vuetify/iconsets/mdi'
import { de, en, es, fr } from 'vuetify/locale'
import 'vuetify/styles'

/**
 * Initializes and configures the Vuetify instance.
 *
 * @constant
 * @type {Object}
 * @property {Object} components - The components to be used in the Vuetify instance.
 * @property {Object} directives - The directives to be used in the Vuetify instance.
 * @property {Object} locale - Configuration for localization.
 * @property {Object} locale.messages - The localization messages for supported languages.
 * @property {Object} icons - Configuration for icon sets.
 * @property {string} icons.defaultSet - The default icon set to be used ('mdi' in this case).
 * @property {Object} icons.aliases - Custom icon aliases combining multiple icon sets.
 * @property {Object} icons.sets - The available icon sets (e.g., FontAwesome, Material Design).
 */
const vuetify = createVuetify({
  components,
  directives,
  locale: {
    messages: { en, fr, de, es },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...faAliases,
      ...mdiAliases,
      ...mdAliases,
    },
    sets: {
      fa,
      mdi,
      md,
    },
  },
})

export default vuetify
