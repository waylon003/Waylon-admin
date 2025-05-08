<script setup lang="ts">
const tabsStore = useTabsStore()

</script>

<template>
     <div>
          <h1>about 1</h1>

          <div>
               <el-button @click="tabsStore.addTab('/about2')">去about 2</el-button>
               <el-button @click="tabsStore.addTab('/home')">去index</el-button>
          </div>
     </div>
</template>

<style scoped></style>