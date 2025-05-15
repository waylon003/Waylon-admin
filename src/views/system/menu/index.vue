<script setup lang="ts">
import { useSSE } from '@/api/sse/demo.ts'

const { message } = useSSE(4)
</script>

<template>
	<div>
		<h1>{{ message }}</h1>
	</div>
</template>

<style scoped></style>
