export function getRandomDate(startTimestamp: number, endTimestamp: number): string {
	const date = new Date(startTimestamp + Math.random() * (endTimestamp - startTimestamp))
	return date.toISOString().split('T')[0] // 返回格式为 YYYY-MM-DD
}

export function getRandomName(): string {
	const firstNames = ['王', '李', '张', '刘', '陈']
	const lastNames = ['小明', '小红', '小刚', '小丽', '小强']
	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
	return firstName + lastName
}

export function getRandomAddress(): string {
	const cities = ['上海市', '北京市', '广州市', '深圳市', '杭州市']
	const districts = ['普陀区', '海淀区', '天河区', '福田区', '西湖区']
	const streets = ['金沙江路', '中关村大街', '天河北路', '深南大道', '文三路']
	const city = cities[Math.floor(Math.random() * cities.length)]
	const district = districts[Math.floor(Math.random() * districts.length)]
	const street = streets[Math.floor(Math.random() * streets.length)]
	const number = Math.floor(Math.random() * 1000) + 1
	return `${city}${district}${street} ${number}号`
}

// 示例调用
console.log(getRandomDate(Math.floor(Math.random() * (1704067200000 - 1672531200000)) + 1672531200000, 1704067200000)) //随机时间
console.log(getRandomName()) // 随机姓名
console.log(getRandomAddress()) // 随机地址
