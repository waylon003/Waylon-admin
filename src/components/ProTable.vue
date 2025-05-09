<script lang="tsx" setup>
import type { Column, ProTable } from './types'
import { ElTable } from 'element-plus'
import Sortable from 'sortablejs'
const tableColumnType = ['selection', 'index', 'expand']
const columnHeaderType = new Map([
	['search', 'Search'],
	['select', 'BrushFilled'],
])

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
				handle: '.checkbox-item',
				onEnd({ newIndex, oldIndex }) {
					if (typeof newIndex === 'number' && typeof oldIndex === 'number') {
						const columnCopy = [...columnChecks.value]
						const targetItem = columnCopy[oldIndex]
						columnCopy.splice(oldIndex, 1)
						columnCopy.splice(newIndex, 0, targetItem)
						columnList.value = columnCopy
					}
				},
			})
		}
	})
})
const fixedColumn = (string: 'left' | 'right', item: Column) => {
	columnList.value = columnChecks.value.map((column) =>
		item.prop === column.prop ? { ...column, fixed: string } : column,
	) as Column[]
}
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
						<div
							class="checkbox-item flex"
							v-for="(item, index) in columnChecks"
							:key="`${item.prop}-${item.label}`"
						>
							<el-checkbox
								v-model="item.checked"
								:label="index + 1 + '.' + item.label"
								:size="item.size || 'large'"
							/>
							<div class="flex ml-20">
								<el-button @click="fixedColumn('left', item)">左固定</el-button>
								<el-button @click="fixedColumn('right', item)">右固定</el-button>
							</div>
						</div>
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
					<span>{{ item.label }}</span>
					<template v-if="item.eve && columnHeaderType.has(item.eve.type)">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link">
								<el-icon class="el-icon--right" size="18px">
									<component :is="columnHeaderType.get(item.eve.type)"></component>
								</el-icon>
							</span>
							<template #dropdown>
								<el-select
									v-model="item.eve.value"
									clearable
									placeholder="请选择"
									style="width: 240px"
									v-if="item.eve.type === 'select'"
									@visible-change="item.eve.event(item.eve.value)"
								>
									<el-option
										v-for="d in item.eve.data"
										:key="d.value"
										:label="d.label"
										:value="d.value"
									/>
								</el-select>
								<el-input
									v-if="item.eve.type === 'search'"
									v-model="item.eve.value"
									style="width: 240px"
									placeholder="请输入关键字"
									clearable
									@keyup.enter="item.eve.event(item.eve.value)"
								/>
							</template>
						</el-dropdown>
					</template>
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

.checkbox-item {
	justify-content: space-between;
	align-items: center;
	cursor: move;
	margin-right: 0;
}
.el-icon--right:hover {
	color: #646cff;
	cursor: pointer;
}
:deep(.cell) {
	display: flex;
	align-items: center;
	justify-content: center;
}
:deep(.caret-wrapper) {
	margin-left: 10px;
}
</style>
