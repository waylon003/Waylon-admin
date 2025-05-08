<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import { fetchUserCode } from '@/api'

const loginType = ref<'password' | 'code'>('password')
const loading = ref(false)
const countdown = ref(0)

const formRef = ref<FormInstance>()
const { login } = useUserStore()

const loginForm = ref<loginParams>({
	phone: '13800013800',
	password: '123456Aa',
	captcha: '',
	type: 'password',
})

// 表单校验规则
const rules = ref<FormRules>({
	phone: [
		{ required: true, message: '请输入手机号', trigger: 'blur' },
		{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码不能少于6位', trigger: 'blur' },
	],
	captcha: [
		{ required: true, message: '请输入验证码', trigger: 'blur' },
		{ len: 6, message: '验证码长度必须为6位', trigger: 'blur' },
	],
})

// 获取验证码
const getCaptcha = async () => {
	try {
		await formRef.value?.validateField('phone')
		// TODO: 调用发送验证码的API
		await fetchUserCode(loginForm.value.phone)
		countdown.value = 60
		const timer = setInterval(() => {
			countdown.value--
			if (countdown.value <= 0) {
				clearInterval(timer)
			}
		}, 1000)
		ElMessage.success('验证码发送成功')
	} catch {
		ElMessage.error('请输入正确的手机号')
	}
}

// 登录方法
const handleLogin = async (formEl: FormInstance | undefined) => {
	console.log(formEl, 'formEl')
	if (!formEl) return

	await formEl.validateField(['phone', loginType.value], async (valid) => {
		if (valid) {
			loading.value = true
			try {
				loginForm.value.type = loginType.value
				await login(loginForm.value)
				ElMessage.success('登录成功')
			} catch (error) {
				console.error(error)
			} finally {
				loading.value = false
			}
		}
	})
}

// 切换登录方式时重置表单
const handleTabChange = () => {
	loginForm.value.password = ''
	loginForm.value.captcha = ''
	formRef.value?.clearValidate()
}
</script>

<template>
	<div class="login-container">
		<el-card class="login-card">
			<h2 class="title">系统登录</h2>
			<el-form ref="formRef" :model="loginForm" :rules="rules" label-width="0" size="large">
				<el-tabs v-model="loginType" @tab-change="handleTabChange">
					<el-tab-pane label="密码登录" name="password">
						<el-form-item prop="phone">
							<el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="User" />
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="loginForm.password"
								type="password"
								placeholder="请输入密码"
								prefix-icon="Lock"
								show-password
							/>
						</el-form-item>
					</el-tab-pane>

					<el-tab-pane label="验证码登录" name="code">
						<el-form-item prop="phone">
							<el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="User" />
						</el-form-item>
						<el-form-item prop="captcha">
							<el-input v-model="loginForm.captcha" placeholder="请输入验证码" prefix-icon="Key">
								<template #append>
									<el-button :disabled="countdown > 0" @click="getCaptcha">
										{{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
									</el-button>
								</template>
							</el-input>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>

				<el-form-item>
					<el-button type="primary" :loading="loading" class="login-button" @click="handleLogin(formRef)">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<style scoped>
.login-container {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
}

.login-card {
	width: 400px;
}

.title {
	text-align: center;
	margin-bottom: 30px;
}

.login-button {
	width: 100%;
}
</style>
