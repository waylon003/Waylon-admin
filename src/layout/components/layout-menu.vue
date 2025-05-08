<script setup lang="ts">
const props = defineProps<{ menuList: any }>()
const router = useRouter()
const { addTab } = useTabsStore()
console.log(props.menuList, 'menuList')
const handleClickMenu = (item: any) => {
	addTab(item)
	router.push({ name: item.name })
}
</script>

<template>
	<template v-for="item in menuList" :key="item.name">
		<el-sub-menu v-if="item.children?.length" :index="item.name">
			<template #title>
				<el-icon> <component :is="item.icon"></component></el-icon>
				<span class="layout-menu__title">{{ item!.title }}</span>
			</template>
			<layout-menu :menuList="item.children"></layout-menu>
		</el-sub-menu>
		<el-menu-item v-else :index="item.name" @click="handleClickMenu(item)">
			<el-icon> <component :is="item.icon"></component></el-icon>
			<template #title>
				<span class="layout-menu__title">{{ item!.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<style scoped></style>
