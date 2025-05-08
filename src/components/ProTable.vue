<script lang="ts" setup>
import type { ProTable } from './types'

const props = withDefaults(defineProps<ProTable>(), {
	loading: false,
	data: [],
	tableProps: {
		border: true,
		style: {
			width: '100%',
			height: '500px',
		},
	},
	column: [],
	paginationProps: {
		background: true,
		layout: 'total, sizes, prev, pager, next, jumper',
		pageSizes: [10, 20, 30],
	},
	pageSizes: [10, 20, 30],
	page: 1,
	limit: 10,
	total: 100,
})
const emit = defineEmits<{
	'update:page': [page: number]
	'update:limit': [limit: number]
	tableLoading: [loading: boolean]
	changePaging: [page: number, limit: number]
}>()
// 处理分页变化
const handlePageChange = (page: number) => {
	emit('update:page', page)
}

const handleSizeChange = (limit: number) => {
	emit('update:limit', limit)
}
const pageChange = (p: number, l: number) => {
	emit('changePaging', p, l)
}
const currentData = computed(() => {
	const start = (props.page - 1) * props.limit
	const end = start + props.limit
	return props.data.slice(start, end)
})
onMounted(() => {
	emit('tableLoading', props.loading)
})
</script>
<template>
	<el-table :data="currentData" v-loading="props.loading" v-bind="props.tableProps">
		<template v-for="item in props.column" :key="item.prop">
			<el-table-column v-bind="item"></el-table-column>
		</template>
	</el-table>
	<el-pagination
		v-bind="props.paginationProps"
		:total="props.total"
		:page-size="props.limit"
		:current-page="props.page"
		@size-change="handleSizeChange"
		@current-change="handlePageChange"
		@change="pageChange"
	/>
</template>

<style scoped></style>
