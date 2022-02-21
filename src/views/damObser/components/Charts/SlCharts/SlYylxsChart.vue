<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}"/>
  </el-card>
</template>

<script>
  import {upliftedPressure} from '@/api/dam/slfx'
  import {format} from '@/utils/datetime'
  import echarts from 'echarts'

  export default {
    name: 'SlYylxsChart',
    props: {
      pid: '',
      begin_date: '',
      end_date: ''
    },
    data() {
      return {
        imgH: document.body.clientHeight - 340,
        option: {
          title: {
            text: '测点' + this.pid + '位势过程线'
          },
          tooltip: {
            show: true,
            trigger: 'axis ',
            axisPointer: {
              type: 'cross',
              axis: 'auto',
              z: 99999
            }
          },
          legend: {
            data: []
          },
          grid: {
            left: '2%',
            right: '2%',
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
            boundaryGap: false,
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
            },
            minInterval: 2
          },
          yAxis: [
            {
              name: '',
              nameLocation: 'end',
              type: 'value',
              inverse: false,
              min: '0',
              max: '1',
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
          series: [
            {
              name: '',
              type: 'line',
              data: []
            },
            {
              name: '',
              type: 'line',
              data: []
            }
          ]
        }
      }
    },
    mounted() {
      this.triggerEvent()
      this.initChart()
    },
    methods: {
      initChart() {
        this.charts = echarts.init(document.getElementById('chartHome'))
        this.charts.setOption(this.option)
      },
      triggerEvent() {
        console.log('startA')
        this.upliftedPressure()
      },
      upliftedPressure() {
        const params = {
          pid: this.pid,
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          const tmArr = []
          const yArr1 = []
          const yArr2 = []
          const sort1 = []
          const sort2 = []
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                yArr1.push([item.X, item.Y])
                sort1.push(item.Y)
              } else {
                yArr2.push([item.X, item.Y])
                sort2.push(item.Y)
              }
            })
          })
          sort1.sort(function (a, b) {
            return a - b
          })
          sort2.sort(function (a, b) {
            return a - b
          })
          const tempOption = this.option
          tempOption.legend.data = [data[0]['Legend_name'], data[1]['Legend_name']]
          tempOption.title.text = '测点' + this.pid + '位势过程线'
          tempOption.yAxis[0].name = '位势'
          tempOption.yAxis[0].min = Math.floor(sort1[0])
          tempOption.yAxis[0].max = parseFloat(parseFloat(sort1[sort1.length - 1]).toFixed(1)) + 0.1
          tempOption.yAxis[1] = {
            name: data[1]['YAxis_name'],
            nameLocation: 'start',
            type: 'value',
            inverse: false,
            min: Math.floor(sort2[0]),
            max: Math.ceil(sort2[sort2.length - 1]),
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
          tempOption.xAxis.data = tmArr
          tempOption.series[0].name = data[0]['Legend_name']
          tempOption.series[0].data = yArr1
          tempOption.series[1].name = data[1]['Legend_name']
          tempOption.series[1].data = yArr2
          tempOption.series[1].yAxisIndex = 1
          this.charts.setOption(tempOption, true)
        })
      }
    }
  }
</script>

<style scoped>

</style>
