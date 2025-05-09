<script setup lang="ts">
import type { TabPaneName } from 'element-plus'
import Sortable from 'sortablejs'

const tabsStore = useTabsStore()
const { tabs, currentTab } = storeToRefs(tabsStore)
const tabsRef = ref<HTMLElement>()
const handleTabsRemove = (targetName: TabPaneName) => {
	tabsStore.removeTab(targetName as string)
}
onMounted(() => {
	// 初始化拖拽
	const tabWrapper = tabsRef.value?.querySelector('.el-tabs__nav') as HTMLElement
	if (tabWrapper) {
		Sortable.create(tabWrapper, {
			animation: 300,
			onEnd({ newIndex, oldIndex }) {
				if (typeof newIndex === 'number' && typeof oldIndex === 'number') {
					const tabsCopy = [...tabs.value]
					const targetItem = tabsCopy[oldIndex]
					tabsCopy.splice(oldIndex, 1)
					tabsCopy.splice(newIndex, 0, targetItem)
					tabs.value = tabsCopy
				}
			},
		})
	}
})
</script>

<template>
	<div ref="tabsRef">
		<el-tabs v-model="currentTab" class="demo-tabs" type="card" @tab-remove="handleTabsRemove">
			<el-tab-pane
				v-for="item in tabs"
				:key="item!.name"
				:label="item!.title"
				:name="item!.name"
				:closable="item.name !== 'Home'"
			></el-tab-pane>
		</el-tabs>
	</div>
</template>

<style lang="scss" scoped></style>
