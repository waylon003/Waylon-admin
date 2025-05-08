import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// export * from './modules/globalSetting'
// export * from './modules/tabs'
// export * from './modules/user'

export default pinia