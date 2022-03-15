<template>
  <div class="box">
    <el-row :gutter="10">
      <tree1 @handleNodeClick="handleNodeClick" @sendWarnPoint="sendWarnPoint" />
      <el-col :span="20" :xs="24">
        <tool-bar1 :proj-name="projName"
                   :id="devicecd"
                   @startAnalyze="startAnalyze"
                   ref="tool-bar"
                   @stmChanged="stmChanged"
                   @etmChanged="etmChanged"
        />
        <points-map :bgimg="bgimg"
                    :point-data="pointData"
                    :devicecd="devicecd"
                    :stm="stm"
                    :etm="etm"
                    :projname="projName"
                    @sendState="sendState"
                    ref="points-map"
                    style="height: 600px"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tree1 from "@/views/damObser/components/Trees/Tree1";
import ToolBar1 from "@/views/damObser/components/toolBar/ToolBar1";
import PointsMap from "@/views/damObser/components/PointsMap/PointsMap";
import {formatWithSeperator} from "@/utils/datetime";

export default {
  name: 'subPage01',
  components: {
    Tree1,
    ToolBar1,
    PointsMap,
  },
  data() {
    return {
      stm: formatWithSeperator(new Date(new Date().getFullYear(), 0, 1), '/', ':').substring(0, 10),
      etm: formatWithSeperator(new Date(), '/', ':').substring(0, 10),
      pointData: '',
      apiData: '',
      devicecd: 'QXND',
      projName: '切向挠度',
      bgimg: 'dam_JXQXND.png'
    }
  },
  methods: {
    //树点击事件
    handleNodeClick(apiData, nodeData) {
      console.log(apiData)
      this.devicecd = apiData.typecd
      if (!nodeData.children) {
        this.bgimg = apiData.bgimg
        this.apiData = apiData
        this.projName = nodeData.label
        this.$refs["tool-bar"].treeStartAnalyze(this.devicecd)
        this.$refs["points-map"].chartShow = false
      }
    },
    sendWarnPoint(data) {
      this.$refs["points-map"].warnPoint = data
      this.$refs["tool-bar"].treeStartAnalyze(this.devicecd)
    },
    stmChanged(data) {
      this.stm = data
      this.$refs["points-map"].tm1 = data
    },
    etmChanged(data) {
      this.etm = data
      this.$refs["points-map"].tm2 = data
    },
    startAnalyze(resData) {
      this.$refs["points-map"].initPoint(resData)
    },
    sendState(state) {
      this.$refs["tool-bar"].equipmentState = state
    }
  }
}
</script>

<style scoped>

</style>
