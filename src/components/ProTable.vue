<script lang="ts" setup>
import type { ProTable } from './types'

const props = withDefaults(defineProps<ProTable>(), {
	loading: false,
	data: [
		{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-04',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-01',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
	],
	tableProps: {
		border: true,
	},
	columnProps: [
		{
			prop: 'date',
			label: '时间',
		},
		{
			prop: 'name',
			label: '名字',
		},
		{
			prop: 'address',
			label: '地址',
		},
	],
	paginationProps: {
		background: true,
		layout: 'prev, pager, next, jumper, ->, total',
	},
	page: 1,
	limit: 10,
	total: 100,
})
const emit = defineEmits<{
	'update:page': [page: number]
	'update:limit': [limit: number]
	tableLoading: [loading: boolean]
}>()
// 处理分页变化
const handlePageChange = (page: number) => {
	emit('update:page', page)
}

const handleSizeChange = (limit: number) => {
	emit('update:limit', limit)
}
onMounted(() => {
	emit('tableLoading', props.loading)
})
</script>
<template>
	<el-table :data="props.data" style="width: 100%" v-loading="props.loading" v-bind="props.tableProps">
		<template v-for="column in props.columnProps" :key="column.prop">
			<el-table-column v-bind="column"></el-table-column>
		</template>
	</el-table>
	<el-pagination
		v-bind="props.paginationProps"
		:total="props.total"
		v-model:page-size="props.limit"
		v-model:current-page="props.page"
		@size-change="handleSizeChange"
		@current-change="handlePageChange"
	/>
</template>

<style scoped></style>
