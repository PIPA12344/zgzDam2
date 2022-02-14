<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" style="height: 300px; margin: 10px 10px 0 10px;" />
    <eigenvalues :table-data="tableData"></eigenvalues>
  </el-card>
</template>

<script>
import echarts from "echarts";
import {waterCharacteristicValue} from "@/api/dam/slfx";
import Eigenvalues from "@/views/damObser/components/table/Eigenvalues";

export default {
  name: "SwTzztjChart",
  props: {
    year: ''
  },
  components: {
    Eigenvalues
  },
  activated() {
    //关闭视频弹窗
    if (this.$oWebControl) {
      this.$oWebControl.JS_HideWnd();
    }
  },
  mounted() {
    //关闭视频弹窗
    if (this.$oWebControl) {
      this.$oWebControl.JS_HideWnd();
    }
    this.initChart()
    this.triggerEvent()
  },
  data() {
    return {
      tableData: [
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        },
        {
          time: '',
          max: '',
          min: '',
          mean: '',
          luffing: '',
        }
        ]
      ,
      option: {
        title: {
          text: '水位特征值分析'
        },
        xAxis: {
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          type: 'category',
          boundaryGap: true,
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true
          },
          axisTick: {
            show: false,
            inside: false,
            alignWithLabel: true
          },
          minInterval: 2
        },
        yAxis: {
          name: '（m）',
        },
        legend: {
          data: ['最大值','最小值','均值','变幅']
        },
        dataZoom: {
          type: 'slider',
          show: true
        },
        tooltip: {},
        series: [
          {
            type: 'bar',
            data: '',
          },
          {
            type: 'bar',
            data: '',
          },
          {
            type: 'bar',
            data: '',
          },
          {
            type: 'bar',
            data: '',
          }
        ]
      },
    }
  },
  methods: {
    initChart() {
      this.charts = echarts.init(document.getElementById('chartHome'))
      this.charts.setOption(this.option)
    },
    triggerEvent() {
      this.waterCharacteristicValue()
    },
    waterCharacteristicValue() {
      const params = {
        year: this.year
      }
      console.log(params);
      waterCharacteristicValue(params).then(res => {
        console.log(res);
        let data = res.data.split(",")
        console.log(data);
        let maxData = data.slice(0,12)
        let minData = data.slice(12,24)
        let meanData = data.slice(24,36)
        let luffing = data.slice(36,48)
        console.log(maxData);
        console.log(minData);
        console.log(meanData);
        console.log(luffing);
        let tempOption = this.option
        tempOption.series[0] = {
          name: '最大值',
          type: 'bar',
          data: maxData
        }
        tempOption.series[1]= {
          name: '最小值',
          type: 'bar',
          data: minData
        }
        tempOption.series[2]= {
          name: '均值',
          type: 'bar',
          data: meanData
        }
        tempOption.series[3]= {
          name: '变幅',
          type: 'bar',
          data: luffing
        }
        let tempTable = this.tableData
        console.log(tempTable);
        for(let i=0;i<tempTable.length;i++) {
          tempTable[i].time = i+1+'月'
          tempTable[i].max = maxData[i]
          tempTable[i].min = minData[i]
          tempTable[i].mean = meanData[i]
          tempTable[i].luffing = luffing[i]
        }
        this.tableData = tempTable
        this.charts.setOption(tempOption, true)
      })
    }
  }
}
</script>

<style scoped>

</style>
