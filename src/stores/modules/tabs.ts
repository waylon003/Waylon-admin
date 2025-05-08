export const useTabsStore = defineStore(
	'tabs',
	() => {
		const tabs = ref<tabsList[]>([{ title: '首页', name: 'Home' }])
		const currentTab = ref('Home')
		const router = useRouter()
		const addTab = (item: tabsList) => {
			const tabIndex = tabs.value?.findIndex((tab) => tab.name === item.name)

			if (tabIndex === -1) {
				tabs.value.push(item)
			}
			currentTab.value = item.name
		}

		const removeTab = (tab: string) => {
			if (tabs.value.length === 1) {
				return
			}

			const tabIndex = tabs.value?.findIndex((item) => item.name === tab)
			if (tabIndex !== -1) {
				tabs.value.splice(tabIndex, 1)
			}

			if (currentTab.value === tab) {
				currentTab.value = tabs.value[tabIndex - 1].name || tabs.value[tabIndex + 1].name || 'Home'
			}
		}

		watch(
			currentTab,
			(newValue) => {
				router.push({ name: newValue })
			},
			{
				immediate: true,
			},
		)

		return { tabs, currentTab, addTab, removeTab }
	},
	{
		persist: {
			storage: window.sessionStorage,
		},
	},
)
