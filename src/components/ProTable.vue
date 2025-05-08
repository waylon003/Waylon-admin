<script lang="ts" setup>
import type { ProTable } from './types'

const props = withDefaults(defineProps<ProTable>(), {
	loading: false,
	data: [],
	tableProps: {
		border: true,
	},
	column: [],
	paginationProps: {
		'page-sizes': [10, 20, 30],
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
	pageChange: [page: number]
	limitChange: [limit: number]
}>()
// 处理分页变化
const handlePageChange = (page: number) => {
	emit('update:page', page)
	emit('pageChange', page)
}

const handleSizeChange = (limit: number) => {
	emit('update:limit', limit)
	emit('limitChange', limit)
}
onMounted(() => {
	emit('tableLoading', props.loading)
})
</script>
<template>
	<el-table :data="props.data" style="width: 100%" v-loading="props.loading" v-bind="props.tableProps">
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
	/>
</template>

<style scoped></style>
