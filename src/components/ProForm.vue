<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FormModel, ProForm, proFormItem } from '@/components/ProForm'
import { getTimeType } from '@/hooks/getTimeType.ts'

const props = withDefaults(defineProps<ProForm>(), {
	formProps: () => ({
		labelWidth: 'auto',
		style: {
			maxWidth: '600px',
		},
	}),
})
const emit = defineEmits<{
	resetForm: [void]
	submitForm: [void]
}>()

const ruleForm = computed<FormModel>(() => props.formModel)

// const ruleForm = defineModel<FormModel>('formModel', { required: true })
const ruleFormItemList = ref<proFormItem[]>([])
const ruleFormItemArr = computed({
	get() {
		if (!props.formItem) {
			return []
		}
		const copyFormItem = [...ruleFormItemList.value]
		copyFormItem.push({
			expandedBox: 'expandedBox',
		} as proFormItem)
		return copyFormItem
	},
	set(val) {
		ruleFormItemList.value = val
	},
})
const isExpanded = ref(false)
const toggleExpand = () => {
	isExpanded.value = !isExpanded.value
}
watch(
	() => props.formItem,
	(val) => {
		if (val) {
			const initData = val.map((item) => {
				const { name, formKey } = item.component
				if (name === 'date' && formKey) {
					const timeType = getTimeType(ruleForm.value[formKey])
					if (!item.component.expand) {
						item.component.expand = {}
					}
					switch (timeType) {
						case 'YYYY-MM-DD':
						case 'date':
						case 'timestamp':
							item.component.expand.valueFormat = timeType
							break
						case 'string':
							console.error(`无效的时间格式--请修改form-model对象中的${formKey}属性为YYYY-MM-DD`)
							break
						default:
							console.error(`无效的时间格式--请修改form-model对象中的${formKey}属性`)
					}
				}
				return item
			})
			ruleFormItemList.value = JSON.parse(JSON.stringify(initData))
		}
	},
	{ once: true, immediate: true },
)
watchEffect(() => {
	ruleFormItemArr.value = props.formItem!.filter((_, index: number) => {
		return isExpanded.value ? index < 3 : index >= 0
	})
})
const ruleFormProps = computed(() => ({
	labelWidth: 'auto',
	style: {
		maxWidth: '100%',
	},
	...props.formProps,
}))
const ruleFormRef = ref<FormInstance>()
defineExpose({
	formRef: ruleFormRef,
})
const submitForm = () => {
	emit('submitForm')
}
const resetForm = () => {
	if (ruleFormRef.value) ruleFormRef.value.resetFields()
	emit('resetForm')
}
const getLastRowSpan = (index: number) => {
	const itemsPerRow = 4 // 每行显示的列数
	const totalItems = ruleFormItemArr.value.length
	const remainingItems = totalItems % itemsPerRow
	return remainingItems === 0 || index < totalItems - remainingItems ? 6 : Math.floor(24 / remainingItems)
}

const isLastRow = (index: number) => {
	const itemsPerRow = 4 // 每行显示的列数
	const totalItems = ruleFormItemArr.value.length
	return index >= totalItems - (totalItems % itemsPerRow)
}
</script>

<template>
	<el-form ref="ruleFormRef" :model="ruleForm" v-bind="ruleFormProps">
		<el-row>
			<template v-for="(item, index) in ruleFormItemArr" :key="item.prop || item.expandedBox">
				<el-col :span="isLastRow(index) ? getLastRowSpan(index) : 6">
					<el-form-item v-bind="item">
						<template #default v-if="item.slot">
							<slot :name="item.prop"> </slot>
						</template>
						<template #default v-if="item.expandedBox">
							<div class="w-full flex flex-end">
								<el-button link type="primary" @click="toggleExpand">{{
									isExpanded ? '展开' : '收起'
								}}</el-button>
								<el-button @click="resetForm">重置</el-button>
								<el-button type="primary" @click="submitForm">查询</el-button>
							</div>
						</template>
						<template v-if="item.component.name === 'input' || item.component.name === 'textarea'">
							<el-input
								v-model="ruleForm[item.component.formKey]"
								placeholder="请输入"
								v-bind="
									item.component.name === 'textarea'
										? { type: 'textarea', ...item.component?.expand }
										: item.component?.expand
								"
							/>
						</template>
						<template v-if="item.component.name === 'select'">
							<el-select-v2
								v-model="ruleForm[item.component.formKey]"
								placeholder="请选择"
								v-bind="item.component.expand"
							/>
						</template>
						<template v-if="item.component.name === 'switch'">
							<el-switch v-model="ruleForm[item.component.formKey]" v-bind="item.component?.expand" />
						</template>
						<template v-if="item.component.name === 'segmented'">
							<el-segmented v-model="ruleForm[item.component.formKey]" v-bind="item.component.expand" />
						</template>
						<template v-if="item.component.name === 'checkbox'">
							<el-checkbox-group v-model="ruleForm[item.component.formKey]">
								<el-checkbox
									v-for="c in item.component.expand.options"
									:key="c.value"
									v-bind="c"
								></el-checkbox>
							</el-checkbox-group>
						</template>
						<template v-if="item.component.name === 'radio'">
							<el-radio-group v-model="ruleForm[item.component.formKey]">
								<el-radio
									v-for="r in item.component.expand.options"
									:key="r.value"
									v-bind="r"
								></el-radio>
							</el-radio-group>
						</template>
						<template v-if="item.component.name === 'date'">
							<el-date-picker
								v-model="ruleForm[item.component.formKey]"
								:type="item.component?.type || 'date'"
								v-bind="
									item.component?.type === 'daterange'
										? {
												'start-placeholder': '开始日期',
												'end-placeholder': '结束日期',
												...item.component?.expand,
											}
										: { placeholder: '请选择时间', ...item.component?.expand }
								"
							/>
						</template>
					</el-form-item>
				</el-col>
			</template>
		</el-row>
	</el-form>
</template>

<style scoped lang="scss">
:deep(.el-form-item:last-child) {
	width: 100%;
	.el-form-item__content {
		width: 100%;
	}
}
</style>
