import { fetchAuthLogin, fetchAuthLogout, fetchEmployeeInfo, fetchUserMenu } from '@/api'
import router from '@/router'
import { generateRoutes, getUserMenusList } from '@/router/dynamicRouting'
import { getRandomAddress, getRandomName } from '@/hooks/floor.ts'
export const useUserStore = defineStore(
	'useUserStore',
	() => {
		//用户信息
		const userInfo = ref<IEmployeeEntity>()
		const userMenus = ref<any>()
		const token = ref<string>()
		const mockData = ref<MockItem[]>()
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
		//mock表格数据
		const mockTableData = () => {
			const arr = []
			for (let i = 0; i < 50; i++) {
				arr.push({
					date: getRandomDate(
						Math.floor(Math.random() * (1704067200000 - 1672531200000)) + 1672531200000 + i,
						1704067200000 - i,
					),
					name: getRandomName(),
					address: getRandomAddress(),
					tag: i % 2 === 0 ? 'primary' : 'success',
					count: i,
					sex: ['女', '男', '人妖'][Math.floor(Math.random() * 3)],
				})
			}
			mockData.value = arr
		}
		return {
			mockData,
			addUserRoutes,
			mockTableData,
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
