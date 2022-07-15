<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}" />
  </el-card>
</template>

<script>
import echarts from "echarts";
import { yingBianTemperatureRelevance } from "@/api/dam/slfx";
import {format} from "@/utils/datetime";

export default {
  name: "YbWdxgxChart",
  props: {
    begin_date: '',
    end_date: '',
    pid: ''
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
      imgH: document.body.clientHeight - 340,
      option: {
        title: {
          text: '测点'+this.pid+'过程线'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '10%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          min: 0,
          max: 300
        },
        legend: {
          data: []
        },
        yAxis: {
          min: 0,
          max: 200,
        },
        dataZoom: {
          type: 'slider',
          show: true
        },
        series: [
          {
            symbolSize: 20,
            data: [],
            type: 'scatter'
          },
          {
            type: 'line',
            data: [],
            symbol: 'none'
          },
        ]
      }
    }
  },
  methods: {
    initChart() {
      this.charts = echarts.init(document.getElementById('chartHome'))
      this.charts.setOption(this.option)
    },
    triggerEvent() {
      this.yingBianTemperatureRelevance()
    },
    yingBianTemperatureRelevance() {
      const params = {
        pid: this.pid,
        begin_date: this.begin_date,
        end_date: this.end_date,
      }
      console.log(this.pid);
      console.log(params);
      yingBianTemperatureRelevance(params).then(res => {
        let data = JSON.parse(res.data)
        let tempOption = this.option
        let mainData = []
        let ymin = 1000
        let ymax = 0
        let xmax = 0
        let xmin = 1000
        data.forEach(group => {
          group.data.forEach(item => {
            mainData.push([item.X,item.Y])
            if(item.X > xmax) {
              xmax = item.X
            }
            if(item.X < xmin) {
              xmin = item.X
            }
            if(item.Y > ymax) {
              ymax = item.Y
            }
            if(item.Y < ymin) {
              ymin = item.Y
            }
          })
        })
        console.log(mainData);
        let lineData = mainData.slice(mainData.length-2,mainData.length)
        let scatterData = mainData.slice(0,mainData.length-2)
        console.log(scatterData);
        console.log(lineData);

        tempOption.xAxis = {
          max: Math.round(xmax)+5,
          min: Math.round(xmin)-5,
          name: '温度（摄氏度）'
        }
        tempOption.yAxis = {
          max: Math.round(ymax)+0.5,
          min: Math.round(ymin)-0.5,
          name: '应变（um）'
        }
        tempOption.series[0] = {
          type: 'scatter',
          data: scatterData,
          name: this.pid
        }
        tempOption.series[1] = {
          type: 'line',
          data: lineData,
          name: '温度'
        }
        tempOption.legend = [
          {
            name: this.pid
          },
          {
            name: '库水位'
          }
        ]
        tempOption.title.text = '测点'+this.pid+'过程线'
        this.charts.setOption(tempOption, true)

      })
    }
  }
}
</script>

<style scoped>

</style>
