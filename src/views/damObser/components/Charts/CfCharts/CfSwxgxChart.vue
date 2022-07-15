<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}" />
  </el-card>
</template>

<script>
import echarts from "echarts";
import {ceFengStageRelevance} from "@/api/dam/slfx";

export default {
  name: "CfSwxgxChart",
  props: {
    pid: '',
    begin_date: '',
    end_date: '',
  },
  mounted() {
    //关闭视频弹窗
    if (this.$oWebControl) {
      this.$oWebControl.JS_HideWnd();
    }
    //初始化图表
    this.initChart()
    //通过接口数据绘制表格
    this.triggerEvent()
  },
  data() {
    return {
      imgH: document.body.clientHeight - 340,
      option: {
        title: {
          text: '测点'+this.pid+'过程线'
        },
        xAxis: {
          min: 0,
          max: 300
        },
        tooltip: {
          trigger: 'axis'
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
        grid: {
          left: '2%',
          right: '2%',
          top: '10%',
          bottom: '8%',
          containLabel: true
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
      this.ceFengStageRelevance()
    },
    //设置接口请求相关数据（由父组件charts传递）
    ceFengStageRelevance() {
      const params = {
        pid: this.pid,
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      //进行网络请求，返回数据处理后导入图表
      ceFengStageRelevance(params).then(res => {
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

        let lineData = mainData.slice(mainData.length-2,mainData.length)
        let scatterData = mainData.slice(0,mainData.length-2)

        tempOption.xAxis = {
          max: Math.round(xmax)+5,
          min: Math.round(xmin)-5,
          name: '库水位（m）'
        }
        tempOption.yAxis = {
          max: Math.round(ymax)+0.5,
          min: Math.round(ymin)-0.5,
          name: '缝宽（mm）'
        }
        tempOption.series[0] = {
          type: 'scatter',
          data: scatterData,
          name: this.pid
        }
        tempOption.series[1] = {
          type: 'line',
          data: lineData,
          name: '库水位'
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
        // tempOption.series.markLine.data
        this.charts.setOption(tempOption, true)
      })
    }
  }

}
</script>

<style scoped>

</style>
