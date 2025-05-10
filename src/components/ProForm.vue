<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { ProForm, proFormItem } from '@/components/ProForm'

const props = withDefaults(defineProps<ProForm>(), {
	formProps: () => ({
		labelWidth: 'auto',
		style: {
			maxWidth: '600px',
		},
	}),
})
const ruleForm = computed(() => props.formModel)
const ruleFormItemList = ref<proFormItem[]>([])
const ruleFormItemArr = computed({
	get() {
		if (!props.formItem) {
			return []
		}
		const copyFormItem = [...ruleFormItemList.value]
		copyFormItem.push({
			prop: 'expandedBox',
			expandedBox: true,
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
		if (Array.isArray(val)) ruleFormItemList.value = JSON.parse(JSON.stringify(val))
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
const submitForm = () => {}
const resetForm = () => {}
</script>

<template>
	<el-form ref="ruleFormRef" :model="ruleForm" v-bind="ruleFormProps">
		<el-row>
			<template v-for="item in ruleFormItemArr" :key="item.prop">
				<el-col :span="6">
					<el-form-item v-bind="item">
						<template #default v-if="item.slot">
							<slot :name="item.prop"> </slot>
						</template>
						<template #default v-if="item.expandedBox">
							<div class="w-full flex flex-center">
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
			<!--			<el-col :span="6">-->
			<!--				<el-form-item>-->
			<!--					<template #default> </template>-->
			<!--				</el-form-item>-->
			<!--			</el-col>-->
		</el-row>
		<!--		<el-form-item label="Activity name" prop="name"> </el-form-item>-->
		<!--		<el-form-item label="Activity zone" prop="region">-->
		<!--			<el-select v-model="ruleForm.region" placeholder="Activity zone">-->
		<!--				<el-option label="Zone one" value="shanghai" />-->
		<!--				<el-option label="Zone two" value="beijing" />-->
		<!--			</el-select>-->
		<!--		</el-form-item>-->
		<!--		<el-form-item label="Activity count" prop="count"> </el-form-item>-->
		<!--		<el-form-item label="Activity time" required>-->
		<!--			<el-col :span="11">-->
		<!--				<el-form-item prop="date1">-->
		<!--					<el-date-picker-->
		<!--						v-model="ruleForm.date1"-->
		<!--						type="date"-->
		<!--						aria-label="Pick a date"-->
		<!--						placeholder="Pick a date"-->
		<!--						style="width: 100%"-->
		<!--					/>-->
		<!--				</el-form-item>-->
		<!--			</el-col>-->
		<!--			<el-col class="text-center" :span="2">-->
		<!--				<span class="text-gray-500">-</span>-->
		<!--			</el-col>-->
		<!--			<el-col :span="11">-->
		<!--				<el-form-item prop="date2">-->
		<!--					<el-time-picker-->
		<!--						v-model="ruleForm.date2"-->
		<!--						aria-label="Pick a time"-->
		<!--						placeholder="Pick a time"-->
		<!--						style="width: 100%"-->
		<!--					/>-->
		<!--				</el-form-item>-->
		<!--			</el-col>-->
		<!--		</el-form-item>-->
		<!--		<el-form-item label="Instant delivery" prop="delivery"> </el-form-item>-->
		<!--		<el-form-item label="Activity location" prop="location"> </el-form-item>-->
		<!--		<el-form-item label="Activity type" prop="type"> </el-form-item>-->
		<!--		<el-form-item label="Resources" prop="resource"> </el-form-item>-->
		<!--		<el-form-item label="Activity form" prop="desc">-->
		<!--			<el-input v-model="ruleForm.desc" type="textarea" />-->
		<!--		</el-form-item>-->
		<!--		<el-form-item>-->
		<!--			<el-button type="primary" @click="submitForm"> Create </el-button>-->
		<!--			<el-button @click="resetForm">Reset</el-button>-->
		<!--		</el-form-item>-->
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
