import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const instance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		const { token } = storeToRefs(useUserStore())
		if (token.value) {
			config.headers.Authorization = token.value
		}
		return config
	},
	(error) => Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		const { code, data, message } = response.data
		if (code === 200) {
			return data
		}

		ElMessage.error(message || '请求失败')
		return Promise.reject(new Error(message || '请求失败'))
	},
	(error) => {
		const { status } = error.response || {}
		const errorMap: Record<number, string> = {
			401: '未授权，请重新登录',
			403: '拒绝访问',
			404: '请求地址不存在',
			500: '服务器错误',
		}

		ElMessage.error(errorMap[status] || '网络错误')
		return Promise.reject(error)
	},
)

// 通用请求函数
const request = async <T = any>(options: AxiosRequestConfig): Promise<T> => {
	try {
		return await instance.request({
			url: options.url,
			method: options.method || 'GET',
			data: options.method !== 'GET' ? options.data : null,
			params: options.method === 'GET' ? options.data : null,
			headers: options.headers,
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

// 导出便捷方法
export const get = <T = any>(url: string, data?: any) => request<T>({ url, method: 'GET', data })

export const post = <T = any>(url: string, data?: any) => request<T>({ url, method: 'POST', data })

export const put = <T = any>(url: string, data?: any) => request<T>({ url, method: 'PUT', data })

export const remove = <T = any>(url: string, data?: any) => request<T>({ url, method: 'DELETE', data })
