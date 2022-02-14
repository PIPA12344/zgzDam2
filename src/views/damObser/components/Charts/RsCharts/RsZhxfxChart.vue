<template>
  <el-card class="mainContentStyleWithHeader">
    <div id="chartHome" :style="{'height': imgH + 'px'}" />
  </el-card>
</template>

<script>
import {raoBaSeepHysteresis} from "@/api/dam/slfx";
import echarts from "echarts";

export default {
  name: "RsZhxfxChart",
  props: {
    pid: '',
    begin_date: '',
    end_date: '',
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
    return{
      imgH: document.body.clientHeight - 340,
      option: {
        title: {
          text: '滞后性分析'
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
          name: '相关系数'
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
          boundaryGap: true,
          data: ['当天', '1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', '11d', '12d', '13d', '14d', '15d', '16d', '17d', '18d', '19d', '20d', '21d', '22d', '23d', '24d', '25d', '26d', '27d', '28d', '29d', '30d'],
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 20
            }
          },
          axisTick: {
            show: true,
            inside: false,
            alignWithLabel: true,
            interval: 1
          }
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
        series: {
          data: [],
          name: '',
          type: 'bar',
          barWidth: 30
        }
      }
    }
  },
  methods: {
    initChart() {
      this.charts = echarts.init(document.getElementById('chartHome'))
      this.charts.setOption(this.option)
    },
    triggerEvent() {
      this.raoBaSeepHysteresis()
    },
    raoBaSeepHysteresis() {
      const params = {
        pid: this.pid,
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      raoBaSeepHysteresis(params).then(res => {
        const data = res.data.split(',')
        data.pop()
        const maxData = Math.max(...data)
        const tempOption = this.option
        tempOption.series = {
          data: data,
          type: 'bar',
          name: '相关系数'
        }
        tempOption.yAxis = {
          max: (maxData + 0.2 * maxData).toFixed(1)
        }
        this.charts.setOption(tempOption, true)
      })
    }
  }
}
</script>

<style scoped>

</style>
