import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'eyi8ruc3',
    dataset: 'production',
  },
  deployment: {
    appId: 'mi21sffi1h7idloxot12288u',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://docs.sanity.io/docs/studio/latest-version-of-sanity
     */
    autoUpdates: true,
  },
})
