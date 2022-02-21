<template>
  <div class="box">
    <el-row :gutter="10">
      <tree2 @treeNodeClick="handleNodeClick"/>
      <el-col :span="20" :xs="24">
        <tool-bar2
          ref="tool-bar"
          :tool-bar-type="toolBarType"
          @pidChanged="pidChanged"
          @stmChanged="stmChanged"
          @etmChanged="etmChanged"
          @startAnalyze="startAnalyze"
          @yearChanged="yearChanged"
        />
        <charts ref="charts" :pid="pid" :stm="stm" :etm="etm" :chart-id="chartId" :year="year"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {formatWithSeperator} from '@/utils/datetime'
import Tree2 from '@/views/damObser/components/Trees/Tree2'
import Charts from '@/views/damObser/components/Charts/Charts'
import ToolBar2 from '@/views/damObser/components/toolBar/ToolBar2'

export default {
  components: {
    Tree2,
    Charts,
    ToolBar2,
  },
  data() {
    return {
      pid: 'UP01',
      chartId: 'sl-yylxs',
      type: 'UP',
      year: 2020,
      toolBarType: {
        deviceType: 'device',
        isRsDevice: false,
        isSllDevice: false,
        isCfDevice: false,
        isNdDevice: false,
        isYbDevice: false,
        visibleStm: true,
        visibleEtm: true,
        isDevice: true,
        isDamDevice: false,
        isYear: false
      },
      stm: formatWithSeperator(new Date(new Date().getFullYear(), 0, 1), '/', ':').substring(0, 10),
      etm: formatWithSeperator(new Date(), '/', ':').substring(0, 10),
    }
  },
  methods: {
    //使所有类型都为false
    toFalse() {
      this.toolBarType.isDevice = false
      this.toolBarType.isDamDevice = false
      this.toolBarType.isSllDevice = false
      this.toolBarType.isCfDevice = false
      this.toolBarType.isNdDevice = false
      this.toolBarType.isYbDevice = false
      this.toolBarType.isYear = false
      this.toolBarType.isRsDevice = false
    },
    /**树点击事件（开始/结束时间是否可见，图表id，测点类型）
     * 给相应的测点类型Boolean值赋值，赋予测点相应的缺省值
     */
    handleNodeClick(vs, ve, id, type) {
      this.toolBarType.visibleStm = vs
      this.toolBarType.visibleEtm = ve
      this.chartId = id
      this.type = type
      switch (type) {
        case 'UP':
          this.toFalse()
          this.toolBarType.deviceType = 'Device'
          this.pid = "UP01"
          break
        case 'BJ' :
          this.toFalse()
          this.toolBarType.deviceType = 'DamDevice'
          break
        case 'Year' :
          this.toFalse()
          this.year = 2020
          this.toolBarType.deviceType = 'chooseYear'
          break
        case 'Rup' :
          this.toFalse()
          this.toolBarType.deviceType = 'RsDevice'
          this.pid = 'Rup1'
          break
        case 'WE' :
          this.toFalse()
          this.pid = 'WE1'
          this.toolBarType.deviceType = 'SllDevice'
          this.toolBarType.isSllDevice = true
          break
        case 'CF' :
          this.toFalse()
          this.pid = 'BMJ-a'
          this.toolBarType.deviceType = 'CfDevice'
          this.toolBarType.isCfDevice = true
          break
        case 'ND' :
          this.pid = '径向12#坝段'
          this.toFalse()
          this.toolBarType.deviceType = 'NdDevice'
          this.toolBarType.isNdDevice = true
          break
        case 'YB':
          this.pid = 'S07-1(1)'
          this.toFalse()
          this.toolBarType.deviceType = 'YbDevice'
          this.toolBarType.isYbDevice = true
          break
        default :
          break
      }
    },
    //测点改变
    pidChanged(data) {
      this.pid = data
    },
    //开始时间改变
    stmChanged(data) {
      this.stm = data
    },
    //结束时间改变
    etmChanged(data) {
      this.etm = data
    },
    //开始分析(调用charts组件中开始分析方法)
    startAnalyze() {
      this.$refs.charts.startAnalyze()
    },
    //改变年份
    yearChanged(data) {
      this.year = data
    },
  }
}
</script>

<style scoped>
.mainContentStyleWithHeader {
  /*height: 680px;*/
}

</style>
