<script setup lang="ts">
import { jsPDF } from 'jspdf'
import type { UploadFile, UploadInstance } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
const uploadRef = ref<UploadInstance>()
const fileList = ref<any>([])
const PDF = new jsPDF('p', 'mm', 'a4')
const pageWidth = PDF.internal.pageSize.getWidth()
const pageHeight = PDF.internal.pageSize.getHeight()
const submitPdf = () => {
	if (fileList.value.length) {
		fileList.value.forEach((item: any, index: number) => {
			const { width, height, url } = item
			if (index > 0) {
				PDF.addPage() // 添加新页面
			}
			console.log(item, 'item')
			// 计算缩放比例和居中位置
			const imgRatio = width / height
			const pageRatio = pageWidth / pageHeight
			let renderWidth, renderHeight, xOffset, yOffset

			if (imgRatio > pageRatio) {
				// 图片更宽，以宽度为基准缩放
				renderWidth = pageWidth
				renderHeight = pageWidth / imgRatio
				xOffset = 0
				yOffset = (pageHeight - renderHeight) / 2
			} else {
				// 图片更高，以高度为基准缩放
				renderHeight = pageHeight
				renderWidth = pageHeight * imgRatio
				xOffset = (pageWidth - renderWidth) / 2
				yOffset = 0
			}

			PDF.addImage(url, 'jpg', xOffset, yOffset, renderWidth, renderHeight)
		})
		PDF.save('自定义.pdf')
	}
}
const handleChange = (_: any, uploadFiles: UploadFile[]) => {
	handleBase64(uploadFiles)
}
const handleRemove = (_: any, uploadFiles: UploadFile[]) => {
	handleBase64(uploadFiles)
}
const handleBase64 = (uploadFiles: UploadFile[]) => {
	if (uploadFiles.length === 0) {
		fileList.value = []
		return
	}
	const readerPromises = uploadFiles.map((file: UploadFile) => {
		return new Promise<{ width: number; height: number; url: string }>((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => {
				const img = new Image()
				img.onload = () => {
					resolve({
						width: img.width,
						height: img.height,
						url: reader.result as string,
					})
				}
				img.onerror = (error) => reject(error)
				img.src = reader.result as string
			}
			reader.onerror = (error) => reject(error)
			reader.readAsDataURL(file.raw as File)
		})
	})
	Promise.all(readerPromises)
		.then((base64Files) => {
			fileList.value = base64Files
		})
		.catch((error) => {
			console.error('Error converting files to base64:', error)
		})
}
</script>

<template>
	<el-upload
		ref="uploadRef"
		class="upload-demo"
		drag
		action="#"
		multiple
		:auto-upload="false"
		:on-change="handleChange"
		:on-remove="handleRemove"
	>
		<el-icon class="el-icon--upload"><upload-filled /></el-icon>
	</el-upload>
	<el-button class="ml-3" type="success" @click="submitPdf"> 导出pdf </el-button>
</template>

<style scoped></style>
