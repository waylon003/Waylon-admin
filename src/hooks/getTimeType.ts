export const getTimeType = (value: unknown): 'string' | 'date' | 'timestamp' | 'invalid' | 'YYYY-MM-DD' | undefined => {
	// 空值判断
	if (!value) return 'invalid'
	// 数组判断
	if (Array.isArray(value)) {
		const types = value.map(getTimeType)
		if (
			types.some((type) => type === 'string' || type === 'invalid' || type === undefined) &&
			new Set(types).size !== 1
		) {
			return 'invalid'
		}
		return types[0]
	}
	// Date 对象判断
	if (value instanceof Date) return 'date'

	// 时间戳判断（数字）
	if (typeof value === 'number' && !isNaN(value)) {
		const timestamp = new Date(value).getTime()
		if (timestamp > 0) return 'timestamp'
	}

	// 字符串时间判断
	if (typeof value === 'string') {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		if (dateRegex.test(value)) return 'YYYY-MM-DD'
		return isNaN(new Date(value).getTime()) ? 'invalid' : 'string'
	}
}
