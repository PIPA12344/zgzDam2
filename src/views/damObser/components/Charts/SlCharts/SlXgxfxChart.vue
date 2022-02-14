<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}"/>
  </el-card>
</template>

<script>
  import {upliftedRelevance} from '@/api/dam/slfx'
  import echarts from 'echarts'
  import line from "@/views/charts/line";

  export default {
    name: 'SlXgxfxChart',
    props: {
      begin_date: '',
      end_date: '',
      pid: ''
    },

    data() {
      return {
        imgH: document.body.clientHeight - 340,
        option: {
          title: {
            text: '测点' + this.pid + '过程线'
          },
          xAxis: {
            min: 0,
            max: 300
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
          legend: {
            data: [
              {
                name: this.pid
              },
              {
                name: '库水位'
              }
            ]
          },
          yAxis: {
            min: 0,
            max: 200,
          },
          series: [
            {
              name: this.pid,
              symbolSize: 20,
              data: [],
              type: 'scatter'
            },
            {
              name: '库水位',
              type: 'line',
              data: [],
              symbol: 'none'
            },
          ]
        }
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
      initChart() {
        this.charts = echarts.init(document.getElementById('chartHome'))
        this.charts.setOption(this.option)
      },
      triggerEvent() {
        this.upliftedRelevance()
      },
      upliftedRelevance() {
        const params = {
          pid: this.pid,
          begin_date: this.begin_date,
          end_date: this.end_date,
        }

        upliftedRelevance(params).then(res => {
          let data = JSON.parse(res.data)
          let tempOption = this.option
          let mainData = []
          let ymin = 1000
          let ymax = 0
          let xmax = 0
          let xmin = 1000
          data.forEach(group => {
            group.data.forEach(item => {
              mainData.push([item.X, item.Y])
              if (item.X > xmax) {
                xmax = item.X
              }
              if (item.X < xmin) {
                xmin = item.X
              }
              if (item.Y > ymax) {
                ymax = item.Y
              }
              if (item.Y < ymin) {
                ymin = item.Y
              }
            })
          })

          let lineData = mainData.slice(mainData.length - 2, mainData.length)
          let scatterData = mainData.slice(0, mainData.length - 2)


          tempOption.xAxis = {
            max: Math.round(xmax) + 5,
            min: Math.round(xmin) - 5,
          }
          tempOption.yAxis = {
            max: Math.round(ymax) + 0.5,
            min: Math.round(ymin) - 0.5,
          }
          tempOption.series[0] = {
            type: 'scatter',
            data: scatterData,
            name: this.pid,
          }
          tempOption.series[1] = {
            type: 'line',
            data: lineData,
            name: '库水位',
          }

          tempOption.title.text = '测点' + this.pid + '过程线'
          // tempOption.series.markLine.data
          this.charts.setOption(tempOption, true)

        })
      }
    }

  }
</script>

<style scoped>

</style>
