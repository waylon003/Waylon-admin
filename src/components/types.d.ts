export interface ProTable {
	loading?: boolean
	data?: any
	page?: number
	limit?: number
	total?: number
	columnProps?: any
	type?: 'selection' | 'index' | 'expand' | 'default'
	paginationProps?: any
	tableProps?: any
}
