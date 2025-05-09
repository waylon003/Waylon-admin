export interface ProTable {
	loading?: boolean
	data?: any
	page?: number
	limit?: number
	total?: number
	column?: any
	type?: 'selection' | 'index' | 'expand' | 'default'
	paginationProps?: any
	tableProps?: any
	pageSizes?: any
	tableEvent?: any
}
