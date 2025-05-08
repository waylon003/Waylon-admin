import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
const modules = import.meta.glob('@/views/**/*.vue')

const loadComponent = (component: string): Component | (() => Promise<Component>) => {
	// 移除 null 返回值
	if (component === 'Layout') {
		return () => import('@/layout/index.vue')
	}
	// 确保返回一个有效的组件
	return modules[`/src/views/${component}.vue`]
}

export const generateRoutes = (menus: MenuItem[]): RouteRecordRaw[] => {
	const routes: RouteRecordRaw[] = []

	menus.forEach((menu) => {
		if (menu.menuType !== 'F') {
			if (menu.menuType === 'M') {
				menu.component = 'Layout'
			} else if (!menu.component && menu.menuType === 'C') {
				menu.component = 'feiji/zhandouji/index'
			}
			const route: RouteRecordRaw = {
				path: menu.path,
				name: menu.name,
				meta: {
					title: menu.title,
					icon: menu.icon,
					hidden: menu.isHidden === 1,
					keepAlive: menu.isCache === 1,
					permission: menu.code,
				},
				component: loadComponent(menu.component),
			} as RouteRecordRaw
			if (menu.menuType === 'M') {
				menu.isHidden = 1
				route.redirect = menu.redirect || '/home'
			}
			if (!Array.isArray(menu.children)) menu.children = []

			if (menu.redirect) {
				route.redirect = menu.redirect
			}

			if (menu.children?.length) {
				route.children = generateRoutes(menu.children)
			}

			routes.push(route)
		}
	})

	return routes as RouteRecordRaw[]
}

export const getUserMenusList = (menus: MenuItem[]): any => {
	const iconList = ['Watermelon', 'Pear', 'NoSmoking', 'Smoking', 'Mug', 'GobletSquareFull']
	const randNum = Math.round(Math.random() * iconList.length)
	menus.forEach((item) => {
		if (item.menuType !== 'F') {
			item.icon = iconList[randNum]
			if (item.children?.length) {
				item.children = getUserMenusList(item.children)
			}
		}
	})
	return menus
}
