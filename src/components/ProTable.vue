<script lang="tsx" setup>
import type { Column, ProTable } from './types'
import { ElTable } from 'element-plus'
import Sortable from 'sortablejs'
const tableColumnType = ['selection', 'index', 'expand']
const props = withDefaults(defineProps<ProTable>(), {
	loading: false,
	tableProps: {
		border: true,
		style: {
			width: '100%',
			height: '500px',
		},
	},
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
	'update:column': [columns: Column[]]
	'update:page': [page: number]
	changePaging: [page: number, limit: number]
}>()
// const pageModel = defineModel<number>('page', { required: true })
const pageModel = computed({
	get() {
		return props.page
	},
	set(val) {
		emit('update:page', val)
	},
})
const limitModel = defineModel<number>('limit', { required: true })
// 处理分页变化
const handlePageChange = (page: number) => {
	pageModel.value = page
}

const handleSizeChange = (limit: number) => {
	limitModel.value = limit
}

const pageChange = (page: number, limit: number) => {
	emit('changePaging', page, limit)
}
const currentData = computed(() => {
	const start = (props.page - 1) * props.limit
	const end = start + props.limit
	return props.data.slice(start, end)
})

const isType = computed(() => tableColumnType.includes(props.column[0]?.type as string))
const columnChecks = computed(() => (isType.value ? props.column.slice(1) : props.column))

const columnList = computed({
	get(): Column[] {
		return columnChecks.value.filter((item) => item.checked)
	},
	set(val: Column[]) {
		emit('update:column', val)
	},
})

const tableRef = ref<InstanceType<typeof ElTable>>()

defineExpose({ element: tableRef })
const checkRef = ref<HTMLElement>()
onMounted(() => {
	// 初始化拖拽
	nextTick(() => {
		const checkWrapper = checkRef.value?.querySelector('.checkbox-list') as HTMLElement
		if (checkWrapper) {
			Sortable.create(checkWrapper, {
				animation: 300,
				handle: '.el-checkbox',
				onEnd({ newIndex, oldIndex }) {
					if (typeof newIndex === 'number' && typeof oldIndex === 'number') {
						console.log(columnChecks.value, 'columnChecks')
						const columnCopy = [...columnChecks.value]
						;[columnCopy[oldIndex], columnCopy[newIndex]] = [columnCopy[newIndex], columnCopy[oldIndex]]
						columnList.value = columnCopy
					}
				},
			})
		}
	})
})
</script>
<template>
	<div class="flex flex-end mb-20">
		<el-dropdown>
			<el-button type="primary">
				列设置<el-icon class="el-icon--right"><arrow-down /></el-icon>
			</el-button>
			<template #dropdown>
				<div class="p-20 flex-box" ref="checkRef">
					<div class="checkbox-list">
						<template v-for="(item, index) in columnChecks" :key="`${item.prop}-${item.label}`">
							<el-checkbox
								v-model="item.checked"
								:label="index + 1 + '.' + item.label"
								:size="item.size || 'large'"
							/>
						</template>
					</div>
				</div>
			</template>
		</el-dropdown>
	</div>
	<el-table
		:data="currentData"
		v-loading="props.loading"
		v-bind="props.tableProps"
		v-on="props.tableEvent"
		ref="tableRef"
	>
		<el-table-column v-if="isType" v-bind="props.column[0]"> </el-table-column>
		<el-table-column v-for="item in columnList" :key="item.prop" v-bind="item">
			<template #default="scope">
				<slot :name="item.prop" v-bind="scope">
					<template v-if="!item.render">
						{{ scope.row[item.prop] }}
					</template>
					<template v-else>
						<component :is="item.render(scope.row[item.prop], scope.row, scope.$index)" />
					</template>
				</slot>
			</template>
			<template #header="scope">
				<slot :name="`${item.prop}-header`" v-bind="scope">
					{{ item.label }}
				</slot>
			</template>
		</el-table-column>
	</el-table>
	<div class="flex flex-center mt-20">
		<el-pagination
			v-bind="props.paginationProps"
			:total="props.total"
			:page-size="limitModel"
			:current-page="pageModel"
			@size-change="handleSizeChange"
			@current-change="handlePageChange"
			@change="pageChange"
		/>
	</div>
</template>

<style scoped lang="scss">
.checkbox-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

:deep(.el-checkbox) {
	cursor: move;
	margin-right: 0;
}
</style>
