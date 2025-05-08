<script setup lang="ts">
const settingStore = useSettingStore()
const { logout } = useUserStore()
const handleChangeMenu = () => {
    settingStore.isCollapse = !settingStore.isCollapse
}
const userLogout = () => {
     logout()
}
</script>


<template>
    <div class="flex flex-center w-full head">
        <div @click="handleChangeMenu">
            <el-icon size="30" v-if="settingStore.isCollapse">
            <Expand />
         </el-icon>
         <el-icon size="30" v-else><Fold /></el-icon>
        </div>
        <div class="flex flex-1 right">
             <el-button @click="userLogout">退出登录</el-button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.head{
    height: 50px;
    border-bottom: 1px solid var(--el-border-color);
}
.right{
    justify-content: flex-end;
    align-items: center;
}
</style>