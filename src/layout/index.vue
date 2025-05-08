<script setup lang="ts">
import layoutAside from './components/layout-aside.vue';
import LayoutHeader from './components/layout-header.vue';
import Tabs from './components/tabs.vue'
const settingStore = useSettingStore()
const collapse = computed(() => {
	return settingStore.isCollapse
})
const layoutAsideBarStyle = computed(() => {
	return {
		width: collapse.value ? '64px' : '220px',
	}
})
</script>

<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside class="layout-aside" :style="layoutAsideBarStyle">
		<layout-aside></layout-aside>
	  </el-aside>
      <el-container class="layout-container_sub">
		<layout-header/>
        <Tabs/>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped lang="scss">

.common-layout {
   width: 100%;
   height: 100%;	
}
.layout-container {
	height: 100%;

	&_sub {
		flex-direction: column;
	}
}
.layout-aside {
	height: 100%;
	transition: all 0.3s;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
	background-color: var(--menu-background-color);
}
</style>
