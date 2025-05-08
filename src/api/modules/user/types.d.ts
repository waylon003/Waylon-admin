interface loginParams {
	captcha: string
	password: string
	phone: string | number
	type: 'password' | 'code'
}

interface IEmployeeEntity {
	createdAt?: string
	departmentId?: number
	id?: number
	phone?: string
	status?: number
	statusDesc?: string
	updatedAt?: string
	username?: string
	[T: string]: any
}

interface MenuItem {
	id: number
	name: string
	path: string
	redirect: string
	icon: string
	title: string
	component: string
	menuType: string
	parentId: number
	sort: number
	status: number
	isFrame: number
	isCache: number
	isHidden: number
	isHome: number
	code: string
	children?: MenuItem[] // 假设 children 是 MenuItem 类型的数组，可按需调整
}
interface tabsList {
	title: string
	name: string
	[T: string]: any
}
