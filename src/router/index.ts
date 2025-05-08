import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 基础路由
const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'index',
		redirect: '/home',
		component: () => import('@/layout/index.vue'),
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('@/views/index/index.vue'),
			},
			{
				path: '/about1',
				name: 'About1',
				component: () => import('@/views/about1/index.vue'),
			},
			{
				path: '/about2',
				name: 'about2',
				component: () => import('@/views/about2/index.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/error/404.vue'),
	},
]
// 创建路由实例
const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
})

// 白名单路由
const whiteList = ['/login']

// 全局前置守卫
router.beforeEach((to, _, next) => {
	console.log(to, _, 'to, _,')

	const { token } = storeToRefs(useUserStore())
	if (token.value) {
		if (to.path === '/login') {
			next('/')
		} else {
			next()
		}
	} else {
		if (whiteList.includes(to.path)) {
			next()
		} else {
			next('/login')
		}
	}
})

router.afterEach((to) => {
	const { name, meta } = to
	if (!meta.hidden && meta && name !== 'login') {
		const { addTab } = useTabsStore()
		addTab({ name: name as string, title: meta.title as string })
	}
})
export default router
