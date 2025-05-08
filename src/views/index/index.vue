<script setup lang="ts">
interface Item {
	date: string
	name: string
	address: string
}

const createData = (): Item[] => {
	const arr: Item[] = []
	for (let i = 0; i < 100; i++) {
		arr.push({
			date: '2016-05-03',
			name: '王小明',
			address: '上海市普陀区金沙江路 1518' + i,
		})
	}
	return arr
}

const column = ref([
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
</script>

<template>
	<pro-table
		:data="data"
		:column="column"
		:loading="loading"
		v-model:page="page"
		v-model:limit="limit"
		:total="total"
		@changePaging="pageChange"
	></pro-table>
</template>

<style scoped></style>
