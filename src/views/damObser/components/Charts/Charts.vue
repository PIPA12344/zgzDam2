<template>
  <component :is="chartId+'-chart'" :ref="chartId" :pid="pid" :begin_date="stm" :end_date="etm" :date="stm" :NS="pid"
             :year="year"/>
</template>

<script>
  import SlYylxsChart from '@/views/damObser/components/Charts/SlCharts/SlYylxsChart'
  import SlFbtfxChart from '@/views/damObser/components/Charts/SlCharts/SlFbtfxChart'
  import SlFbtfxDhChart from "@/views/damObser/components/Charts/SlCharts/SlFbtFxDhChart";
  import SlXgxfxChart from '@/views/damObser/components/Charts/SlCharts/SlXgxfxChart'
  import SlZhxfxChart from '@/views/damObser/components/Charts/SlCharts/SlZhxfxChart'
  import SwLztYkChart from '@/views/damObser/components/Charts/SwCharts/SwLztYkChart'
  import SwLztZkChart from '@/views/damObser/components/Charts/SwCharts/SwLztZkChart'
  import SwTzztjChart from "@/views/damObser/components/Charts/SwCharts/SwTzztjChart"
  import RsWsfxChart from "@/views/damObser/components/Charts/RsCharts/RsWsfxChart"
  import RsXgxfxChart from "@/views/damObser/components/Charts/RsCharts/RsXgxfxChart"
  import RsZhxfxChart from "@/views/damObser/components/Charts/RsCharts/RsZhxfxChart";
  import SllHyllfxChart from "@/views/damObser/components/Charts/SllCharts/SllHyllfxChart";
  import SllXgxfxChart from "@/views/damObser/components/Charts/SllCharts/SllXgxfxChart";
  import CfSwxgxChart from "@/views/damObser/components/Charts/CfCharts/CfSwxgxChart";
  import CfWdxgxChart from "@/views/damObser/components/Charts/CfCharts/CfWdXgxChart";
  import NdFbtfxChart from "@/views/damObser/components/Charts/NdCharts/NdFbtfxChart";
  import NdFbtfxDhChart from "@/views/damObser/components/Charts/NdCharts/NdFbtfxDhChart";
  import YbSwxgxChart from "@/views/damObser/components/Charts/YbCharts/YbSwxgxChart";
  import YbWdxgxChart from "@/views/damObser/components/Charts/YbCharts/YbWdxgxChart";

  export default {
    name: 'Charts',
    components: {
      SlYylxsChart,
      SlFbtfxChart,
      SlFbtfxDhChart,
      SlXgxfxChart,
      SlZhxfxChart,
      SwLztYkChart,
      SwLztZkChart,
      SwTzztjChart,
      RsWsfxChart,
      RsXgxfxChart,
      RsZhxfxChart,
      SllHyllfxChart,
      SllXgxfxChart,
      CfSwxgxChart,
      CfWdxgxChart,
      NdFbtfxChart,
      NdFbtfxDhChart,
      YbWdxgxChart,
      YbSwxgxChart
    },
    data() {
      return {}
    },
    props: {
      pid: '',
      stm: '',
      etm: '',
      chartId: '',
      year: ''
    },
    computed: {},
    methods: {
      //开始分析，通过表格id,确定对应表格进行数据查询
      startAnalyze() {
        this.$refs[this.chartId].triggerEvent()
      }
    }
  }
</script>

<style scoped>

</style>
