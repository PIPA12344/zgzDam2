<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}" />
  </el-card>
</template>

<script>
import { waterWeekCharts } from '@/api/dam/slfx'

import echarts from 'echarts'

export default {
  name: 'SwLztZkChart',
  props: {
    begin_date: '',
    end_date: ''
  },
  data() {
    return {
      imgH: document.body.clientHeight - 340,
      option: {
        title: {
          text: '水位K线图分析'
        },
        xAxis: {
          data: '',
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
          min: 100,
          max: 300
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '10%',
          bottom: '8%',
          containLabel: true
        },
        legend: {
          name: '水位高度'
        },
        dataZoom: {
          type: 'slider',
          show: true
        },
        tooltip: {},
        series: [{
          type: 'k',
          data: '',
        }]
      },
    }
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
  methods: {
    triggerEvent() {
      this.waterWeekCharts()
    },
    initChart() {
      this.charts = echarts.init(document.getElementById('chartHome'))
      this.charts.setOption(this.option)
    },
    waterWeekCharts() {
      const params = {
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      waterWeekCharts(params).then(res => {
        const tempOption = this.option
        const data = res.data.split(',')
        const num = data[0]
        const timeNum = parseInt(num) + 1
        const time = data.slice(1, timeNum)
        const dataK = data.slice(timeNum, data.length - 1)
        dataK.forEach((item,index) => {
          dataK[index] = parseInt(dataK[index])
        })
        const K = []
        for (let i = 0; i < num; i++) {
          const n = i * 4
          const x = i * 4 + 4
          const temp = dataK.slice(n, x)
          temp.map(Number)
          K.push(temp)
        }
        console.log(K);
        tempOption.xAxis.data = time
        tempOption.series = {
          data: K,
          type: 'k',
        }
        let ymin = Math.min(...dataK)
        let ymax = Math.max(...dataK)
        tempOption.title.text = "水位K线图分析"
        tempOption.yAxis.min = ymin-(ymax-ymin)
        tempOption.yAxis.max = ymax+(ymax-ymin)
        tempOption.yAxis.name = '(m)'
        this.charts.setOption(tempOption, true)
      })
    }
  }
}
</script>

<style scoped>

</style>
