<template>
  <div style="margin-bottom:10px;">
    <el-card>
    <span>
      <begin-date @stmChanged="stmChanged"/>
      <span> ~ </span>
      <end-date @etmChanged="etmChanged"/>
      <el-button type="primary" icon="el-icon-search" @click="buttonStartAnalyze"
                 style="margin-left:10px;">查询</el-button>
      <span style="margin-left: 20px">
        <!--<i>{{projName}}</i>-->
        <i style="margin-left: 10px;font-style: normal;">最新数据时间：<span style="font-size: 16px;font-weight: bold;">{{date}}</span></i>
        <i style="margin-left: 10px;font-style: normal;">设备总计：<span style="font-size: 16px;font-weight: bold;">{{equipmentState.count}}</span></i>
        <i style="margin-left: 10px;font-style: normal;">正常：<span style="font-size: 16px;font-weight: bold;">{{equipmentState.normal}}</span></i>
        <i style="margin-left: 10px;font-style: normal;">损坏：<span style="font-size: 16px;font-weight: bold;color: red;">{{equipmentState.damage}}</span></i>
        <i style="margin-left: 10px;font-style: normal;">报警：<span style="font-size: 16px;font-weight: bold;color: red;">{{equipmentState.alarm}}</span></i>
        <i style="margin-left: 10px;font-style: normal;">无数据（停用）：<span style="font-size: 16px;font-weight: bold;color: red;">{{equipmentState.deactive}}</span></i>
      </span>
    </span>
    </el-card>
  </div>
</template>

<script>
  import chooseDate from "@/views/damObser/components/toolBar/components/chooseDate";
  import BeginDate from "@/views/damObser/components/toolBar/components/BeginDate";
  import EndDate from "@/views/damObser/components/toolBar/components/EndDate";
  import {formatWithSeperator} from "@/utils/datetime";
  import {listByType, getpointernew} from "@/api/dam/slfx";

  export default {
    name: "ToolBar1",
    components: {
      chooseDate,
      BeginDate,
      EndDate,
    },
    props: {
      projName: '',
      id: ''
    },
    methods: {
      //日期改变
      stmChanged(date) {
        this.$emit('stmChanged', date)
      },
      etmChanged(date) {
        this.$emit('etmChanged', date)
      },
      //开始查询
      buttonStartAnalyze() {
        let params = {
          typecd: this.id,
          rescd: this.rescd
        }
        listByType(params).then(res => {
          this.$emit('startAnalyze', res.data)
        })
      },
      treeStartAnalyze(id) {
        let params = {
          typecd: id,
          rescd: this.rescd
        }
        listByType(params).then(res => {
          this.$emit('startAnalyze', res.data)
          this.data = res.data
        }).then(() => {
          let params2 = {
            devicecd: this.data[0].devicecd,
            rescd: this.rescd
          }
          getpointernew(params2).then(res => {
            if (res.data.length === 0) {
              this.date = '暂无数据'
            } else {
              this.date = res.data[0].date
            }
          })
        })

      },
    },
    data() {
      return {
        date: '暂无数据',
        count: '',
        equipmentState: {
          count: 0,
          normal: 0,
          alarm: 0,
          deactive: 0,
          damage: 0,
        },
      }
    }
  }
</script>

<style scoped>
  .toolBar {
    width: 100%;
  }
</style>
