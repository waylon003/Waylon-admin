import { ref, onMounted, onUnmounted } from 'vue'
import { SSEClient } from '@/api/sse/index.ts'

export function useSSE(id: number) {
	const messagesList = ref<string[]>([])
	const connectionStatus = ref<boolean>(false)

	const sseClient = new SSEClient({
		url: `https://emotional.northal.online/api/v1/ai/analyze/survey/${id}/stream`,
		retry: 5000,
		maxRetries: 5,
		headers: {
			Authorization:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDk5MDU4NzIsImlhdCI6MTc0NzMxMzg3MiwiaXNzIjoiTm9ydGgtcmVzdGF1cmFudCIsInN1YiI6MiwidXNlcm5hbWUiOiJ3cXEifQ.-mB4SgRH8_PPzGyaKyjginLhrzlO2NTt0-u8aQ3MNZk',
			accept: 'text/event-stream',
		},
		onMessage: (event) => {
			console.log(event, '查看后端返回的数据')
			messagesList.value.push(event.data)
		},
		onError: (error) => {
			console.error('连接错误:', error)
			connectionStatus.value = false
		},
		onOpen: () => {
			console.log('连接成功')
			connectionStatus.value = true
		},
	})

	onMounted(() => {
		sseClient.connect()
	})

	onUnmounted(() => {
		sseClient.disconnect()
	})
	const message = computed(() => messagesList.value.join(''))
	return {
		message,
		messagesList,
		connectionStatus,
		sseClient,
	}
}
