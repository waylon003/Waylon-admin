<script setup lang="ts">
import type { proFormItem, RuleFormPro } from '@/components/ProForm'
import type { FormProps, FormRules } from 'element-plus'
const rules = reactive<FormRules<RuleFormPro>>({
	name: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	region: [
		{
			required: true,
			message: 'Please select Activity zone',
			trigger: 'change',
		},
	],
	count: [
		{
			required: true,
			message: 'Please select Activity count',
			trigger: 'change',
		},
	],
	date: [
		{
			type: 'array',
			required: true,
			message: 'Please pick a date',
			trigger: 'change',
		},
	],
	location: [
		{
			required: true,
			message: 'Please select a location',
			trigger: 'change',
		},
	],
	type: [
		{
			type: 'array',
			required: true,
			message: 'Please select at least one activity type',
			trigger: 'change',
		},
	],
	resource: [
		{
			required: true,
			message: 'Please select activity resource',
			trigger: 'change',
		},
	],
	desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
})
const options = Array.from({ length: 10000 }, (_, idx) => ({
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
const ruleForm = reactive<RuleFormPro>({
	name: 'Hello',
	count: '',
	delivery: false,
	location: '',
	type: [],
	resource: '',
	desc: '',
	date: [],
})
const formProps = ref<Partial<FormProps>>({
	rules: rules,
	inline: true,
})

const forItemProps = ref<proFormItem[]>([
	{
		label: '姓名',
		prop: 'name',
		component: {
			name: 'input',
			formKey: 'name',
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
</script>

<template>
	<pro-form :form-model="ruleForm" :formProps="formProps" :formItem="forItemProps"></pro-form>
</template>

<style scoped></style>
