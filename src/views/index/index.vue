<script setup lang="ts">
const { logout } = useUserStore()
const userLogout = () => {
     logout()
}


const tabsStore = useTabsStore()
</script>

<template>
     <div>
          <h1>首页</h1>
          <el-button @click="userLogout">退出登录</el-button>

          
          <div>
               <el-button @click="tabsStore.addTab('/about1')">去about 1</el-button>
               <el-button @click="tabsStore.addTab('/about2')">去about 2</el-button>
          </div>
     </div>
</template>

<style scoped></style>