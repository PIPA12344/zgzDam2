<template>
  <el-card class="mainContentStyleWithHeader" :style="{'height': listsH + 'px'}">
    <div style="position: relative;width: 100%" @click="chartShow=false">
      <h1 class="title-name">{{projname}}</h1>
      <device-img :icon-url="iconUrl"
                  :icon-warn-url="iconWarnUrl"
                  :point-attributes="pointAttributes"
                  @pointClick="pointClick"
      />
      <keep-alive>
        <move-chart :chart-attributes="chartAttributes"
                    v-if="chartShow"
                    @chartClick=chartClick
                    ref="moveChart"/>
      </keep-alive>
      <img :src=pictureUrl
           ref="bigPicture"
           class="imgClass"
           style="height: 600px">
    </div>
  </el-card>
</template>

<script>
  import {chartByTimeDeviceRescd} from "@/api/dam/slfx";
  import MoveChart from "@/views/damObser/components/Charts/moveChart/MoveChart";
  import DeviceImg from "@/views/damObser/components/PointsMap/DeviceImg";

  export default {
    name: "PointsMap",
    components: {
      MoveChart,
      DeviceImg
    },
    props: {
      bgimg: '',
      devicecd: '',
      stm: '',
      etm: '',
      projname: "",
    },
    updated() {
    },
    data() {
      return {
        listsH: document.body.clientHeight - 300,
        imgH: document.body.clientHeight-300,
        warnPoint: '',
        tm1: this.stm,
        tm2: this.etm,
        pointAttributes: [],
        active: true,
        smallIcon: '',
        warnIcon: '',
        chartAttributes: [],
        chartShow: false,
        picHeight: 0,
        picWidth: 0,
        img: new Image,
        equipmentState: {
          count: 0,
          normal: 0,
          alarm: 0,
          deactive: 0,
          damage: 0,
        }
      }
    },
    computed: {
      //通过传入接口bgimg的值动态加载图片
      pictureUrl() {
        return require('../../../../assets/img/dam/floorPlan/' + this.bgimg)
      },
      iconUrl() {
        //通过观测项目id确定图标
        switch (this.devicecd) {
          case 'CZ' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/SD.png')
            return require('../../../../assets/img/dam/newIcons/SD.png')
          case 'QXND' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/QXND.png')
            return require('../../../../assets/img/dam/newIcons/QXND.png')
          case 'JXND' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/JXND.png')
            return require('../../../../assets/img/dam/newIcons/JXND.png')
          case 'QX' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/HD.png')
            return require('../../../../assets/img/dam/newIcons/HD.png')
          case 'JX' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/HD.png')
            return require('../../../../assets/img/dam/newIcons/HD.png')
          case 'HF' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/J.png')
            return require('../../../../assets/img/dam/newIcons/J.png')
          case 'BJJF' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/J.png')
            return require('../../../../assets/img/dam/newIcons/J.png')
          case 'JYBH' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/ID.png')
            return require('../../../../assets/img/dam/newIcons/ID.png')
          case 'UP' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/UP.png')
            return require('../../../../assets/img/dam/newIcons/UP.png')
          case 'RBSL' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/PR.png')
            return require('../../../../assets/img/dam/newIcons/PR.png')
          case 'WE' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/WE.png')
            return require('../../../../assets/img/dam/newIcons/WE.png')
          case 'ZYBJ' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/WE.png')
            return require('../../../../assets/img/dam/newIcons/WE.png')
          case 'YB' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/S.png')
            return require('../../../../assets/img/dam/newIcons/S.png')
          case 'HNTWD' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/T.png')
            return require('../../../../assets/img/dam/newIcons/T.png')
          case 'SW' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/T.png')
            return require('../../../../assets/img/dam/newIcons/T.png')
          case 'QW' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/T.png')
            return require('../../../../assets/img/dam/newIcons/T.png')
          case 'JSL' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/JSL.png')
            return require('../../../../assets/img/dam/newIcons/JSL.png')
          case 'KSW' :
            this.smallIcon = require('../../../../assets/img/dam/newIcons/T.png')
            return require('../../../../assets/img/dam/newIcons/T.png')
          default :
            return this.smallIcon
        }
      },
      iconWarnUrl() {
        switch (this.devicecd) {
          case 'CZ' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/SD.gif')
            return require('../../../../assets/img/dam/warnIcons/SD.gif')
          case 'QXND' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/warn.png')
            return require('../../../../assets/img/dam/warnIcons/warn.png')
          case 'JXND' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/warn.png')
            return require('../../../../assets/img/dam/warnIcons/warn.png')
          case 'QX' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/HD.gif')
            return require('../../../../assets/img/dam/warnIcons/HD.gif')
          case 'JX' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/HD.gif')
            return require('../../../../assets/img/dam/warnIcons/HD.gif')
          case 'HF' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/J.gif')
            return require('../../../../assets/img/dam/warnIcons/J.gif')
          case 'BJJF' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/J.gif')
            return require('../../../../assets/img/dam/warnIcons/J.gif')
          case 'JYBH' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/ID.gif')
            return require('../../../../assets/img/dam/warnIcons/ID.gif')
          case 'UP' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/UP.gif')
            return require('../../../../assets/img/dam/warnIcons/UP.gif')
          case 'RBSL' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/PR.gif')
            return require('../../../../assets/img/dam/warnIcons/PR.gif')
          case 'WE' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/WE.gif')
            return require('../../../../assets/img/dam/warnIcons/WE.gif')
          case 'ZYBJ' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/WE.gif')
            return require('../../../../assets/img/dam/warnIcons/WE.gif')
          case 'YB' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/S.gif')
            return require('../../../../assets/img/dam/warnIcons/S.gif')
          case 'HNTWD' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/T.gif')
            return require('../../../../assets/img/dam/warnIcons/T.gif')
          case 'SW' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/T.gif')
            return require('../../../../assets/img/dam/warnIcons/T.gif')
          case 'QW' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/T.gif')
            return require('../../../../assets/img/dam/warnIcons/T.gif')
          case 'JSL' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/warn.png')
            return require('../../../../assets/img/dam/warnIcons/warn.png')
          case 'KSW' :
            this.warnIcon = require('../../../../assets/img/dam/warnIcons/T.gif')
            return require('../../../../assets/img/dam/warnIcons/T.gif')
          default :
            return this.warnIcon
        }
      }
    },
    methods: {
      getDeviceType(data) {
        this.devicecd = data
      },
      initPoint(pointData) {
        //通过获取图片原始数据和拉申后的数据，得到图片height，width扩张的比例，将比例带进点位的x，y进行同样比例的变换
        this.picHeight = this.$refs.bigPicture.offsetHeight
        this.picWidth = this.$refs.bigPicture.offsetWidth
        this.img.src = this.pictureUrl
        this.pointAttributes = []
        this.equipmentState = {
          count: 0,
          normal: 0,
          alarm: 0,
          deactive: 0,
          damage: 0,
        }
        //遍历测点获取测点属性
        for (let i = 0; i < pointData.length; i++) {
          let active = 'normal'
          this.equipmentState.count++
          if (pointData[i].apply === '停用') {
            active = 'deactivate'
            this.equipmentState.deactive++
          } else if (this.warnPoint.indexOf(pointData[i].devicecd) !== -1) {
            active = 'alarm'
            this.equipmentState.alarm++
          } else {
            this.equipmentState.normal++
          }
          //设置测点的css属性以及相关所需参数
          let styleObject = {
            position: 'absolute',
            height: '22px',
            width: '22px',
            marginTop: pointData[i].y * this.picHeight / this.img.height + 'px',
            // marginTop: pointData[i].y  + 'px',
            marginLeft: pointData[i].x * this.picWidth / this.img.width-this.picWidth*0.5 + 'px',
            // marginLeft: pointData[i].x + 'px',
            devicecd: pointData[i].devicecd,
            value: pointData[i].value,
            active: active,
            cursor: 'pointer',
          }
          this.pointAttributes.push(styleObject)
        }
        //将设备信息发送至父组件
        this.$emit('sendState', this.equipmentState)
      },
      chartClick() {
        //设置延时防止和父级元素点击事件冲突
        setTimeout(() => {
          this.chartShow = true
        }, 1)
      },
      pointClick(devicecd, x, y) {
        let params = {
          tm1: this.tm1,
          tm2: this.tm2,
          devicecd: devicecd,
          rescd: this.rescd
        }
        setTimeout(() => {
          chartByTimeDeviceRescd(params).then(res => {
            this.chartData = res.data
            this.$refs.moveChart.initChart(res.data, devicecd)
          })
        },200)

        //设置表格窗口弹出位置，防止跳出窗口可视范围内
        if (parseInt(x) < 0) {
          x = parseInt(x) + 600 + 'px'
        }
        if(parseInt(y) >257) {
          y = parseInt(y)-300 +'px'
        }
        this.chartAttributes = {
          position: 'absolute',
          marginLeft: x,
          marginTop: y,
          height: '300px',
          width: '600px',
          backgroundColor: 'white',
        }
        //延时0.1秒，操作体验更自然
        setTimeout(() => {
          this.chartShow = true
        }, 100)
      }
    }
  }
</script>

<style scoped>
  .title-name {
    position: absolute;
    /* text-align: center; */
    width: 100%;
    text-align: center;
    margin: 0;
  }

  .imgClass {
    width: calc(100% - 20px);
  }
</style>
