<template>
  <el-table
    :data="tableData"
    style="text-align: center">
    <el-table-column
      prop="time"
      label="时间"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="max"
      label="最大值"
      width="230px">
    </el-table-column>
    <el-table-column
      prop="min"
      label="最小值"
      width="230px">
    </el-table-column>
    <el-table-column
      prop="mean"
      label="均值"
      width="230px">
    </el-table-column>
    <el-table-column
      prop="luffing"
      label="变幅"
      width="230px">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Eigenvalues",
  props: {
    tableData : ''
  }
}
</script>

<style scoped>
  .el-table {
    width: 80%;
    margin-left: 15%;
}
</style>
