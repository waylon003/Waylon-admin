<script setup lang="tsx">
import type { RuleFormPro } from '@/components/ProForm'
import type { FormProps } from 'element-plus'
import { userList } from '@/hooks/useList.ts'
import { createData } from '@/hooks/mockData.ts'
const getInitialState = () => ({
	keywords: '',
	count: '',
	location: '',
	sex: '',
	date: ['2012-12-01', '2012-12-31'],
})
const { list, total, params, loading, search } = userList({ api: createData, defaultParams: getInitialState() })
const submitForm = () => {
	search(ruleForm.value)
	params.page = 1
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
		prop: 'sex',
		label: '性别',
		checked: true,
	},
	{
		prop: 'address',
		label: '地址',
		checked: true,
		eve: {
			type: 'search',
			value: '',
			event: submitForm,
		},
	},
	{
		prop: 'count',
		label: '数字排序',
		checked: true,
		sortable: true,
		eve: {
			type: 'select',
			data: selectList.value,
			value: '',
			event: submitForm,
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
		render: (text: any, row: MockItem, index: number) => {
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
const pageChange = (page: any, limit: any) => {
	console.log(page, limit, '当前页和当前大小')
}

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

const options = Array.from({ length: 50 }, (_, idx) => ({
	value: `${idx + 1}`,
	label: `${idx + 1}`,
}))
const radioOptions = [
	{
		label: '男',
		value: 1,
	},
	{ label: '女', value: 0 },
	{ label: '人妖', value: -1 },
]

const locationOptions = ['primary', 'success']

const ruleForm = ref<RuleFormPro>(getInitialState())
const formProps = ref<Partial<FormProps>>({
	inline: true,
})

const forItemProps = ref([
	{
		label: '关键字',
		prop: 'keywords',
		component: {
			name: 'input',
			formKey: 'keywords',
			expand: {
				style: {
					maxWidth: '250px',
				},
			},
		},
	},
	{
		label: '数字',
		prop: 'count',
		component: {
			name: 'select',
			formKey: 'count',
			expand: {
				options: options,
				style: {
					maxWidth: '250px',
				},
			},
		},
	},
	{
		label: '标签',
		prop: 'location',
		component: {
			name: 'segmented',
			formKey: 'location',
			expand: {
				options: locationOptions,
				style: {
					maxWidth: '250px',
				},
			},
		},
	},
	{
		label: '单选类型',
		prop: 'sex',
		component: {
			name: 'radio',
			formKey: 'sex',
			expand: {
				options: radioOptions,
				style: {
					maxWidth: '250px',
				},
			},
		},
	},
	{
		label: '时间',
		prop: 'date',
		component: {
			name: 'date',
			formKey: 'date',
			type: 'daterange',
			expand: {
				style: {
					maxWidth: '250px',
				},
			},
		},
	},
])
</script>

<template>
	<div class="mb-20 card">
		<pro-form
			:form-model="ruleForm"
			:formProps="formProps"
			:formItem="forItemProps"
			@submitForm="submitForm"
		></pro-form>
	</div>
	<pro-table
		:data="list"
		v-model:column="column"
		:loading="loading"
		:table-event="tableEvent"
		v-model:page="params.page"
		v-model:limit="params.limit"
		:total="total"
		@changePaging="pageChange"
		ref="childTable"
	>
	</pro-table>
</template>

<style scoped></style>
