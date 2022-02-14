<template>
  <div id="moveChart" :style="chartAttributes" @click="chartClick"/>
</template>

<script>
  import echarts from "echarts";
  import line from "@/views/charts/line";

  export default {
    name: "MoveChart",
    props: {
      chartAttributes: '',
      chartData1: ''
    },
    mounted() {
      //关闭视频弹窗
      if (this.$oWebControl) {
        this.$oWebControl.JS_HideWnd();
      }
    },
    data() {
      return {
        chartData2: '',
        option: {
          title: {
            text: '',
            textAlign: 'center',
            padding: [20, 0, 0, 350]
          },
          xAxis: {
            name: '',
            type: 'category',
            data: ['2021-3-10', '2021-4-10', '2021-5-10', '2021-6-10', '2021-7-10', '2021-8-10', '2021-9-10'],
          },
          yAxis: {
            name: '测值',
            type: 'value',
          },
          legend: {
            name: '',
          },
          tooltip: {
            trigger: 'axis'
          },
          series: [{
            name: '',
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            markLine:
              {
                symbol: "none",
                label: {
                  formatter: "警戒值(上限)",
                  position: "middle",
                },
                data: [
                  {
                    silent: false,             //鼠标悬停事件  true没有，false有
                    lineStyle: {               //警戒线的样式  ，虚实  颜色
                      type: "solid",
                      color: "red"
                    },
                    yAxis: -1     //警戒线在y轴的坐标
                  }
                ]
              }
          },
            {
              name: '',
              data: [],
              type: 'line',
              markLine:
                {
                  symbol: "none",               //去掉警戒线最后面的箭头
                  data: [
                    {
                      silent: false,             //鼠标悬停事件  true没有，false有
                      lineStyle: {               //警戒线的样式  ，虚实  颜色
                        type: "solid",
                        color: "red"
                      },
                      yAxis: -1     //警戒线在y轴的坐标
                    }
                  ]
                }
            }
          ]
        }
      }
    },
    methods: {
      initChart(chartData, devicecd) {
        this.charts = echarts.init(document.getElementById('moveChart'))
        this.charts.setOption(this.option)
        let tempOption = this.option
        let xData = []
        let yData = []
        let upperLimit = ''
        let lowerLimit = ''
        for (let i in chartData) {
          xData.push(chartData[i].tm)
          yData.push(chartData[i].value)
          upperLimit = chartData[0].maxv
          lowerLimit = chartData[0].minv
        }
        tempOption.xAxis.data = xData
        tempOption.series[0] = {
          data: yData,
          type: 'line',
          markLine:
            {
              symbol: "none",
              label: {
                position: "middle",
                formatter: "警戒值（上限）"
              },
              data: [
                {
                  name: '上限',
                  silent: false,
                  lineStyle: {
                    type: "solid",
                    color: "red"
                  },
                  yAxis: upperLimit
                }
              ]
            },
        }
        tempOption.series[1] = {
          markLine:
            {
              symbol: "none",
              label: {
                position: "middle",
                formatter: "警戒值（下限）"
              },
              data: [
                {
                  name: '下限',
                  silent: false,
                  lineStyle: {
                    type: "solid",
                    color: "red"
                  },
                  yAxis: lowerLimit
                }
              ]
            },
        }
        tempOption.title.text = devicecd
        this.charts.setOption(tempOption)
      },
      chartClick() {
        this.$emit('chartClick')
      }
    }
  }
</script>

<style scoped>
  #moveChart {
    border: 2px solid #999999;
  }
</style>
