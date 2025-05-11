interface Params {
	[key: string]: any
}

interface UserListOptions {
	api: Function
	defaultParams?: any
}

export function userList({ api, defaultParams }: UserListOptions) {
	const list = ref([])
	const total = ref(0)
	const params = reactive<Params>({
		page: 1,
		limit: 10,
		keywords: '',
		...defaultParams,
	})
	const loading = ref<boolean>(false)
	const fetchData = async () => {
		loading.value = true
		try {
			const data = await api(params)
			list.value = data.list
			total.value = data.total
		} catch (error) {
			console.error('Failed to fetch list:', error)
		} finally {
			loading.value = false
		}
	}
	watch(params, fetchData, { deep: true, immediate: true })
	// const reset = () => {
	// 	Object.keys(params).forEach((key) => {
	// 		params[key] = defaultParams ? (defaultParams as Record<string, any>)[key] : undefined
	// 	})
	// }
	//
	const search = (newParams = {}) => {
		Object.assign(params, newParams)
	}
	return {
		list,
		total,
		params,
		loading,
		search,
	}
}
