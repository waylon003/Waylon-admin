import { fetchAuthLogin, fetchAuthLogout, fetchEmployeeInfo, fetchUserMenu } from '@/api'
import router from '@/router'
import { generateRoutes, getUserMenusList } from '@/router/dynamicRouting'
export const useUserStore = defineStore(
	'useUserStore',
	() => {
		//用户信息
		const userInfo = ref<IEmployeeEntity>()
		const userMenus = ref<any>()
		const token = ref<string>()

		//登录
		const login = async (user: loginParams) => {
			token.value = await fetchAuthLogin(user)
			await getUserInfo()
			await getUserMenus()
			await addUserRoutes()
			console.log(router.getRoutes(), 'router.getRoutes')
			console.log(router.options.routes, 'router.options.routes')

			await router.replace('/')
		}

		//登出
		const logout = async () => {
			try {
				token.value = undefined
				userInfo.value = undefined
				await fetchAuthLogout()
				ElMessage.success('退出成功')
			} finally {
				await router.replace('/login')
			}
		}

		//获取用户信息
		const getUserInfo = async () => {
			userInfo.value = await fetchEmployeeInfo()
		}
		//获取用户树
		const getUserMenus = async () => {
			const menusList = await fetchUserMenu()
			userMenus.value = getUserMenusList(menusList)
		}
		// 动态添加路由方法
		const addUserRoutes = async () => {
			try {
				const accessRoutes = generateRoutes(userMenus.value)
				accessRoutes.forEach((route) => {
					router.addRoute(route)
				})
			} catch (error) {
				console.error('生成路由出错：', error)
			}
		}
		return {
			addUserRoutes,
			userMenus,
			userInfo,
			token,
			login,
			logout,
			getUserMenus,
		}
	},
	{
		persist: {
			storage: localStorage,
		},
	},
)
