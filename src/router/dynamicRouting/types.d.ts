// 后端返回的菜单项接口
// export interface MenuItem {
// 	path: string
// 	name: string
// 	component: string
// 	redirect?: string
// 	children?: MenuItem[]
// 	title: string
// 	icon: string
// 	isHidden: number
// 	isCache: number
// 	menuType: string
// 	code?: string
// }
//  interface MenuItem {
//     id: number
//     name: string
//     path: string
//     redirect: string
//     icon: string
//     title: string
//     component: string
//     menuType: string
//     parentId: number
//     sort: number
//     status: number
//     isFrame: number
//     isCache: number
//     isHidden: number
//     isHome: number
//     code: string
//     children?: MenuItem[] // 假设 children 是 MenuItem 类型的数组，可按需调整
// }
// // 扩展 RouteRecordRaw 的 meta 类型
// declare module 'vue-router' {
// 	interface RouteMeta {
// 		title: string
// 		icon: string
// 		hidden: boolean
// 		keepAlive: boolean
// 		permission?: string
// 	}
// }
