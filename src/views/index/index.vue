<script setup lang="tsx">
interface Item {
	date: string
	name: string
	address: string
	tag: string
	dataNum: number
}
const createData = (): Item[] => {
	const arr: Item[] = []
	for (let i = 0; i < 50; i++) {
		arr.push({
			date: `2016-05-03 xx${i}`,
			name: '王小明',
			address: '上海市普陀区金沙江路 1518' + i,
			tag: i % 2 === 0 ? 'primary' : 'success',
			dataNum: i,
		})
	}
	return arr
}
const selectList = ref([
	{
		value: 10,
		label: '0-9',
	},
	{
		value: 20,
		label: '10-19',
	},
	{
		value: 30,
		label: '20-29',
	},
	{
		value: 40,
		label: '30-39',
	},
	{
		value: 50,
		label: '40-49',
	},
])
const addressSearch = (keyword: string) => {
	if (!keyword) {
		data.value = createData() // 如果关键字为空，恢复原始数据
		return
	}
	const regex = new RegExp(keyword, 'i') // 'i' 表示不区分大小写
	data.value = data.value.filter((item) => {
		return regex.test(item.address)
	})
}
const numberSelect = (value: number) => {
	if (!value) {
		data.value = createData() // 如果关键字为空，恢复原始数据
		return
	}
	data.value = data.value.filter((item) => {
		return item.dataNum < value && item.dataNum > value - 10
	})
}
const column = ref([
	{
		type: 'selection',
	},
	{
		prop: 'date',
		label: '时间',
		checked: true,
	},
	{
		prop: 'name',
		label: '名字',
		checked: true,
	},
	{
		prop: 'address',
		label: '地址',
		checked: true,
		eve: {
			type: 'search',
			value: '',
			event: addressSearch,
		},
	},
	{
		prop: 'dataNum',
		label: '数字排序',
		checked: true,
		sortable: true,
		eve: {
			type: 'select',
			data: selectList.value,
			value: '',
			event: numberSelect,
		},
	},
	{
		prop: 'tag',
		label: 'tsx插槽标签',
		checked: true,
		/**
		 *
		 * @param {any} text 当前行的值
		 * @param {Item} row  当前行数据
		 * @param {number} index  行索引
		 * @returns {JSX.Element} 返回一个JSX元素
		 */
		render: (text: any, row: Item, index: number) => {
			console.log(row, index, '当前数据')
			return () => <el-tag type={text}>{text}</el-tag>
		},
	},
	{
		prop: 'tag',
		label: 'slot标签',
		slot: 'tag',
		checked: false,
	},
])

const loading = ref(false)
const page = ref(1)
const limit = ref(10)
const data = ref<Item[]>([])
const total = ref(0)
const loadData = () => {
	loading.value = true
	setTimeout(() => {
		data.value = createData()
		total.value = data.value.length
		loading.value = false
	}, 1000)
}
loadData()
const pageChange = (page: any, limit: any) => {
	console.log(page, limit, '当前页和当前大小')
}
const childTable = ref()

onMounted(() => {
	console.log(childTable.value, '??????')
})

const tableSelect = (selection: any, row: any) => {
	console.log(selection, row, '用户选中')
}
const tableSelectAll = (selection: any) => {
	console.log(selection, 'selection')
}
const tableEvent = ref({
	select: tableSelect,
	selectAll: tableSelectAll,
})
</script>

<template>
	<pro-table
		:data="data"
		v-model:column="column"
		:loading="loading"
		:table-event="tableEvent"
		v-model:page="page"
		v-model:limit="limit"
		:total="total"
		@changePaging="pageChange"
		ref="childTable"
	>
		<template #date="{ row }"> 自定义内容：{{ row.date }} </template>
		<template #date-header="{ column }"> 自定义表头：{{ column.label }} </template>
	</pro-table>
</template>

<style scoped></style>
