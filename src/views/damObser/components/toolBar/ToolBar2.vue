<template>
  <div style="margin-bottom:10px;">
    <el-card>
    <span>
      <component :is="toolBarType.deviceType" @pidChanged="pidChanged" @yearChanged="yearChanged"/>
      <begin-date v-if="toolBarType.visibleStm" @stmChanged="stmChanged"/>
      <span v-if="toolBarType.visibleEtm"> ~ </span>
      <end-date v-if="toolBarType.visibleEtm" @etmChanged="etmChanged"/>
      <el-button type="primary" icon="el-icon-search" @click="startAnalyze" style="margin-left:10px;">开始分析</el-button>
    </span>
    </el-card>
  </div>
</template>

<script>
  import Device from '@/views/damObser/components/toolBar/Device/Device'
  import RsDevice from "@/views/damObser/components/toolBar/Device/RsDevice";
  import SllDevice from "@/views/damObser/components/toolBar/Device/SllDevice";
  import CfDevice from "@/views/damObser/components/toolBar/Device/CfDevice";
  import BeginDate from '@/views/damObser/components/toolBar/components/BeginDate'
  import EndDate from '@/views/damObser/components/toolBar/components/EndDate'
  import DamDevice from '@/views/damObser/components/toolBar/Device/DamDevice'
  import ChooseYear from "@/views/damObser/components/toolBar/components/ChooseYear"
  import NdDevice from "@/views/damObser/components/toolBar/Device/NdDevice";
  import YbDevice from "@/views/damObser/components/toolBar/Device/YbDevice";

  export default {
    name: 'ToolBar',
    components: {
      YbDevice,
      NdDevice,
      SllDevice,
      BeginDate,
      EndDate,
      Device,
      DamDevice,
      ChooseYear,
      RsDevice,
      CfDevice,
    },
    props: {
      toolBarType: '',
      visibleStm: true,
      visibleEtm: true,
    },
    data() {
      return {
        pid: '',
        stm: '',
        etm: '',
        year: ''
      }
    },
    computed: {
      deviceType() {

      }
    },
    methods: {
      //开始分析
      startAnalyze() {
        this.$emit('startAnalyze')
      },
      //测点选择
      pidChanged(data) {
        this.pid = data
        this.$emit('pidChanged', this.pid)
      },
      //开始时间改变
      stmChanged(data) {
        this.stm = data
        this.$emit('stmChanged', this.stm)
      },
      //结束时间改变
      etmChanged(data) {
        this.etm = data
        this.$emit('etmChanged', this.etm)
      },
      //年份改变
      yearChanged(data) {
        this.year = data
        this.$emit('yearChanged', this.year)
      },
    }
  }
</script>

<style scoped>
  .toolBar {
    width: 100%;
  }
</style>
