<script lang="ts" setup>
import type { ProTable } from './types'
enum tableColumnType {
	type = ['selection', 'index', 'expand'],
}
import { ElTable } from 'element-plus'

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

const isType = computed(() => tableColumnType.type.includes(props.column[0]?.type))

const columnList = computed(() => (isType ? props.column.slice(1) : props.column))

const tableRef = ref<InstanceType<typeof ElTable>>()

defineExpose({ element: tableRef })
</script>
<template>
	<el-table :data="currentData" v-loading="props.loading" v-bind="props.tableProps" ref="tableRef">
		<el-table-column v-if="isType" v-bind="props.column[0]"> </el-table-column>
		<el-table-column v-for="item in columnList" :key="item.prop" v-bind="item">
			<template #default="scope">
				<slot :name="item.prop" v-bind="scope">
					{{ scope.row[item.prop] }}
				</slot>
			</template>
			<template #header="scope">
				<slot :name="`${item.prop}-header`" v-bind="scope">
					{{ item.label }}
				</slot>
			</template>
		</el-table-column>
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
