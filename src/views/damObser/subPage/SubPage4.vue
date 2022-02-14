<template>
  <div class="box">
    <el-row :gutter="10">
      <tree4 @handleNodeClick="handleNodeClick"/>
      <el-col :span="20" :xs="24">
        <div class="toolBar" v-if="false">
          <el-button type="primary" icon="el-icon-plus" plain> 人员编辑</el-button>
        </div>
      </el-col>
      <manager-chart ref="manager-chart"/>
    </el-row>
  </div>
</template>

<script>
import Tree4 from "@/views/damObser/components/Trees/Tree4";
import ManagerChart from "@/views/damObser/components/Charts/ManagerCharts/ManagerChart";

export default {
  components: {
    Tree4,
    ManagerChart,
  },
  props: {},
  data() {
    return {}
  },
  methods: {
    handleNodeClick(nodeData) {
      if (!nodeData.children) {
        this.$refs["manager-chart"].startAnalyze(nodeData.id)
      }
    },
  }
}
</script>

<style scoped>
.box {
  /*margin: 5px;*/
}
</style>
