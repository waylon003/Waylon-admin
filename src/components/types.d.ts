import type { TableColumnInstance } from 'element-plus'
export interface ProTable {
	loading?: boolean
	data: any
	page?: number
	limit?: number
	total?: number
	column: Column[]
	type?: 'selection' | 'index' | 'expand' | 'default'
	paginationProps?: any
	tableProps?: any
	pageSizes?: any
	tableEvent?: any
}
interface Item {
	date: string
	name: string
	address: string
	tag: string
}
interface Column extends TableColumnInstance {
	type?: string
	prop?: string
	label?: string
	checked?: boolean
	size?: 'large' | 'default' | 'small'
	render?: (value: any, row: Item, index: number) => any
	eve?: eve
}
interface eve {
	type: 'search' | 'select'
	data?: any
	value: any
	event: any
}
