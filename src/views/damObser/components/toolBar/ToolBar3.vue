<template>
  <div>
    <div style="margin-bottom:10px;">
      <el-card>
      <span>
        <begin-data @stmChanged="stmChanged"/>
        <span> ~ </span>
        <end-data @etmChanged="etmChanged"/>
        <el-button type="primary" icon="el-icon-search" @click="startAnalyze" style="margin-left:10px;">查询</el-button>
        <el-button type="primary" size="mini" class="btnStyleRight" plain>录入</el-button>
        <el-button type="primary" size="mini" class="btnStyleLeft btnStyleRight" plain>删除</el-button>
        <el-button type="primary" size="mini" class="btnStyleLeft" plain @click="exportExcel">导出</el-button>
      </span>
      </el-card>
    </div>
  </div>
</template>

<script>
  import BeginData from "@/views/damObser/components/toolBar/components/BeginDate";
  import EndData from "@/views/damObser/components/toolBar/components/EndDate";

  export default {
    components: {
      BeginData,
      EndData
    },
    props: {},
    data() {
      return {}
    },
    methods: {
      startAnalyze() {
        this.$emit('startAnalyze')
      },
      dateChanged() {
        this.$emit('dateChanged', this.tm)
      },
      stmChanged(data) {
        this.$emit('stmChanged', data)
      },
      etmChanged(data) {
        this.$emit('etmChanged', data)
      },
      exportExcel() {
        console.log('exportClick')
        this.$emit('exportExcel')
      }
    }
  }
</script>

<style scoped>


  .form .el-form-item {
    margin-bottom: 0;
  }

  .toolBar {
    width: 100%;
  }

  .btnStyleLeft {
    margin-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 1px solid white;
  }

  .btnStyleRight {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
