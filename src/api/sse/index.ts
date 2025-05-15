import { EventSourcePolyfill } from 'event-source-polyfill'

interface SSEOptions {
	url: string
	retry?: number
	maxRetries?: number
	heartbeatTimeout?: number // 新增心跳超时配置
	onMessage?: (event: MessageEvent) => void
	onError?: (error: Event) => void
	onOpen?: (event: Event) => void
	headers?: any
}

export class SSEClient {
	private eventSource: EventSource | null = null
	private retryCount = 0
	private heartbeatTimer: number | null = null
	private readonly options: SSEOptions

	constructor(options: SSEOptions) {
		this.options = {
			retry: 3000,
			maxRetries: 3,
			heartbeatTimeout: 60000, // 默认60秒
			...options,
		}
	}

	connect(): void {
		if (this.eventSource) {
			this.disconnect()
		}

		this.eventSource = new EventSourcePolyfill(this.options.url, {
			headers: this.options.headers,
		})

		this.eventSource.onopen = (event: Event) => {
			this.retryCount = 0
			this.resetHeartbeat()
			this.options.onOpen?.(event)
		}

		this.eventSource.onmessage = (event: MessageEvent) => {
			this.resetHeartbeat()
			this.options.onMessage?.(event)
		}

		this.eventSource.onerror = (error: Event) => {
			this.options.onError?.(error)
			this.handleError()
		}
	}

	private resetHeartbeat(): void {
		if (this.heartbeatTimer) {
			window.clearTimeout(this.heartbeatTimer)
		}

		this.heartbeatTimer = window.setTimeout(() => {
			console.warn('心跳超时，准备重连')
			this.disconnect()
			this.connect()
		}, this.options.heartbeatTimeout)
	}
	private handleError(): void {
		if (this.retryCount < (this.options.maxRetries as number)) {
			this.retryCount++
			setTimeout(() => {
				console.warn(`重试第 ${this.retryCount} 次`)
				this.connect()
			}, this.options.retry)
		} else {
			console.warn('达到最大重试次数，断开连接')
			this.disconnect()
		}
	}
	disconnect(): void {
		if (this.heartbeatTimer) {
			window.clearTimeout(this.heartbeatTimer)
			this.heartbeatTimer = null
		}

		if (this.eventSource) {
			this.eventSource.close()
			this.eventSource = null
		}
	}
}
