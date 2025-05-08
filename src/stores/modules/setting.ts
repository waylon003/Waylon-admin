
export const useSettingStore = defineStore('settingStore', () => {
     const isCollapse = ref(false) // 菜单折叠
     
     
     return { isCollapse }
}, {
    persist: {
        storage: window.sessionStorage,
    },
})