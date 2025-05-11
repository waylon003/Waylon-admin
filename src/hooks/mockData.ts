import { useUserStore } from '@/stores'
interface data {
	list: MockItem[]
	total: number
}
const { mockData } = useUserStore()
export const createData = (params: any): Promise<data> => {
	return new Promise((resolve) => {
		const { page, limit, keywords } = params
		console.log(page, 'createData的page')
		const filteredData = keywords
			? (mockData?.filter((item) =>
					keywords ? item.name.includes(keywords) || item.address.includes(keywords) : true,
				) ?? [])
			: (mockData ?? [])
		const start = (page - 1) * limit
		const end = start + limit
		const initData = filteredData.slice(start, end)

		setTimeout(() => {
			resolve({ list: initData, total: mockData!.length })
		}, 2000)
	})
}
