<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="subPage1">数据展示</el-menu-item>
    <el-menu-item index="subPage2">数据分析</el-menu-item>
    <el-menu-item index="subPage3">报表管理</el-menu-item>
    <el-menu-item index="subPage4">预警管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: "subPage1"
    }
  },
  methods: {
    handleSelect(index) {
      this.$emit('selectIndex', index)
    }
  }
}
</script>

<style scoped>

</style>
