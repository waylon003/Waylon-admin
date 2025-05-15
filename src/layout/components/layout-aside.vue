<script setup lang="ts">
import LayoutMenu from '@/layout/components/layout-menu.vue'

const { userMenus } = useUserStore()
const { isCollapse } = storeToRefs(useSettingStore())
const route = useRoute()
const activeName = ref()

watch(
	() => route.name,
	(val) => {
		activeName.value = val
	},
	{ immediate: true },
)
</script>

<template>
	<el-menu :default-active="activeName" :unique-opened="true" :collapse-transition="false" :collapse="isCollapse">
		<layout-menu :menu-list="userMenus"></layout-menu>
	</el-menu>
</template>

<style lang="scss" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 220px;
//   min-height: 400px;
// }
</style>
