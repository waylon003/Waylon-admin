import type { FormItemProps, FormProps } from 'element-plus'
interface proFormItem extends FormItemProps {
	labelPosition?: FormItemProps['labelPosition']
	labelWidth?: FormItemProps['labelWidth']
	showMessage?: FormItemProps['showMessage']
	inlineMessage?: FormItemProps['inlineMessage']
	slot?: boolean
	expandedBox?: string
	component: FormItemComponent
}
interface FormModel {
	[key: string]: any // 添加索引签名
}
export interface ProForm {
	formModel: FormModel
	formProps?: Partial<FormProps> & {
		style?: {
			maxWidth?: string
			[key: string]: any
		}
	}
	formItem?: proFormItem[]
}

interface RuleFormPro {
	keywords: string
	count: number | string // 修改为联合类型
	location: string
	sex: number | string // 修改为联合类型
	date: any
}
type BaseOption = {
	label: string
	value: any
	[T: string]: any
}

type ComponentWithOptions = {
	name: 'select' | 'checkbox' | 'radio'
	formKey: string
	expand: {
		options: BaseOption[]
		[key: string]: any
	}
}
type ComponentSegmentedOptions = {
	name: 'segmented'
	formKey: string
	expand: {
		options: BaseOption[] | string[]
		[key: string]: any
	}
}
type ComponentDateOptions = {
	name: 'date'
	type?:
		| 'year'
		| 'years'
		| 'month'
		| 'months'
		| 'date'
		| 'dates'
		| 'datetime'
		| 'week'
		| 'datetimerange'
		| 'daterange'
		| 'monthrange'
		| 'yearrange'
	formKey: string
	expand?: {
		[key: string]: any
	}
}
type ComponentWithoutOptions = {
	name: 'input' | 'switch' | 'textarea'
	formKey: string
	expand?: {
		[key: string]: any
	}
}

type FormItemComponent =
	| ComponentWithOptions
	| ComponentWithoutOptions
	| ComponentSegmentedOptions
	| ComponentDateOptions
