<script setup lang="ts">
import type { proFormItem, RuleFormPro } from '@/components/ProForm'
import type { FormProps } from 'element-plus'
const options = Array.from({ length: 50 }, (_, idx) => ({
	value: `${idx + 1}`,
	label: `${idx + 1}`,
}))
const radioOptions = [
	{
		label: '男',
		value: 1,
	},
	{ label: '女', value: 2 },
	{ label: '人妖', value: -1 },
]
const checkOptions = [
	{ label: '哈哈哈', value: 'hhh' },
	{ label: '嘻嘻嘻', value: 'xxx' },
	{ label: '嗯嗯嗯', value: 'eee' },
]
const locationOptions = ['Home', 'Company', 'School']
const getInitialState = () => ({
	keywords: '',
	count: '',
	location: '',
	sex: '',
	date: ['2012-12-01', '2012-12-31'],
})
const ruleForm = ref<RuleFormPro>(getInitialState())
const formProps = ref<Partial<FormProps>>({
	inline: true,
})

const forItemProps = ref<proFormItem[]>([
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
		label: '开关',
		prop: 'delivery',
		component: {
			name: 'switch',
			formKey: 'delivery',
			expand: {
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
		label: '多选类型',
		prop: 'type',
		component: {
			name: 'checkbox',
			formKey: 'type',
			expand: {
				options: checkOptions,
				style: {
					maxWidth: '250px',
				},
			},
		},
	},
	{
		label: '单选类型',
		prop: 'resource',
		component: {
			name: 'radio',
			formKey: 'resource',
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
watch(
	ruleForm,
	(val) => {
		console.log(val, '变化了ruleForm')
	},
	{ deep: true, immediate: true },
)
const resetForm = () => {}
</script>

<template>
	<pro-form :form-model="ruleForm" :formProps="formProps" :formItem="forItemProps" @resetForm="resetForm"></pro-form>
</template>

<style scoped></style>
