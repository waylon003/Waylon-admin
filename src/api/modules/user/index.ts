import { post, get } from '@/api/request'
import type { MenuItem } from '@/router/dynamicRouting/types'
// 用户登录
export const fetchAuthLogin = (data: loginParams) => post<string>('/admin/auth/login', data)

// 用户退出
export const fetchAuthLogout = () => post<boolean>('/admin/auth/logout')

//获取用户信息
export const fetchEmployeeInfo = () => get<IEmployeeEntity>('/admin/employee/info')

//获取验证码
export const fetchUserCode = (phone: number | string) => get<boolean>(`/admin/otp/phone/send/${phone}`)

//获取用户菜单
export const fetchUserMenu = () => get<MenuItem[]>('/admin/menu/tree')