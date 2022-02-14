<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}" />
  </el-card>
</template>

<script>
import echarts from "echarts";
import {naoDuDistribution} from "@/api/dam/slfx";

export default {
  name: "NdFbtfxChart",
  props: {
    date: '',
    NS: '',
  },
  data() {
    return {
      imgH: document.body.clientHeight - 340,
      option: {
        title: {
          text: '断面坝基分布图'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            axis: 'auto',
            z: 99999
          }
        },
        legend: {
          name: ''
        },
        grid: {
          left: '2%',
          right: '5%',
          top: '10%',
          bottom: '8%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: {
          type: 'slider',
          show: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: [],
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
          }
        },
        yAxis: [
          {
            name: '',
            nameLocation: 'end',
            type: 'value',
            inverse: false,
            min: '0',
            max: '1000',
            splitNumber: 5,
            axisLine: {
              show: true
            },
            axisLabel: {
              show: true
            },
            axisTick: {
              show: true,
              inside: false,
              alignWithLabel: true
            }
          }
        ],
        series: {
          name: '',
          type: 'line',
          data: [1, 2, 3, 4],
          smooth: true,
        }
      }
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
  methods: {
    initChart() {
      this.charts = echarts.init(document.getElementById('chartHome'))
      this.charts.setOption(this.option)
    },
    triggerEvent() {
      this.naoDuDistribution()
    },

    naoDuDistribution() {
      const params = {
        NS: this.NS,
        date: this.date
      }
      naoDuDistribution(params).then(res => {
        const data = res.data.split(',')
        let num = data[2]
        let num1 = 3+parseInt(num)
        let num2 = 4+parseInt(num)
        let num3 =4+parseInt(num)*2
        const xdata = data.slice(3, num1)
        const ydata = data.slice(num2, num3)
        const ymax = Math.max(...ydata)
        const ymin = Math.min(...ydata)
        const tempOption = this.option
        tempOption.xAxis.data = xdata
        tempOption.xAxis.name = '高程（m）'
        tempOption.series.data = ydata
        tempOption.series.name = this.date
        tempOption.legend.name = this.date
        tempOption.yAxis = {
          max: Math.round(ymax + ymax*0.2),
          min: Math.round(ymin - ymax*0.2),
          name: '位移'
        }
        this.charts.setOption(tempOption, true)
      })
    }
  }
}
</script>

<style scoped>

</style>
