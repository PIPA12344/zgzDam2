<template>
  <el-card class="mainContentStyleWithHeader">
    <el-table
      id="out-table"
      v-loading="loading"
      :height="imgH"
      :data="tableData"
      :header-cell-style="centerStyle"
      :cell-style="centerStyle"
      style="width: 100%">
      <el-table-column
        prop="tm"
        label="日期"
      />
      <el-table-column label="测点编号及绕坝渗流(L/S)">
        <el-table-column
          prop="Rup1"
          label="Rup1"/>
        <el-table-column
          prop="Rup2"
          label="Rup2"/>
        <el-table-column
          prop="Rup3"
          label="Rup3"/>
        <el-table-column
          prop="Rup4"
          label="Rup4"/>
        <el-table-column
          prop="Rup5"
          label="Rup5"/>
        <el-table-column
          prop="Rup6"
          label="Rup6"/>
        <el-table-column
          prop="Rup7"
          label="Rup7"/>
        <el-table-column
          prop="Rup8"
          label="Rup8"/>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {raoBaSeepPotential} from "@/api/dam/slfx";
import {format} from "@/utils/datetime";
export default {
  props: {
    stm: '',
    etm: ''
  },
  data() {
    return {
      imgH: document.body.clientHeight - 340,
      loading: true,
      pid: ['Rup1','Rup2','Rup3','Rup4','Rup5','Rup6','Rup7','Rup8'],
      begin_date: this.stm,
      end_date: this.etm,
      centerStyle: {
        textAlign: 'center'
      },
      tableData: [
      ]
    }
  },
  mounted() {
    //关闭视频弹窗
    if (this.$oWebControl) {
      this.$oWebControl.JS_HideWnd();
    }
    this.getTableData()
  },
  methods: {
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = this.$XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = this.$XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        this.$FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], {type: "application/octet-stream"}),
          //设置导出文件名称
          "导出.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    getTableData() {
      this.begin_date = this.stm
      this.end_date = this.etm
      this.tableData = []
      let tmArr = []
      let tmArr1 = []
      let tmArr2 = []
      let tmArr3 = []
      let tmArr4 = []
      let tmArr5 = []
      let tmArr6 = []
      let tmArr7 = []
      let tmArr8 = []
      let  Rup1 = []
      let  Rup2 = []
      let  Rup3 = []
      let  Rup4 = []
      let  Rup5 = []
      let  Rup6 = []
      let  Rup7 = []
      let  Rup8 = []
      let params = {
        pid: this.pid[0],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      console.log(params)
      let p1= raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              tmArr1.push(item.X)
              Rup1.push(item.Y)
            }
          })
        })
        length = tmArr.length
      })
      params = {
        pid: this.pid[1],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p2= raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              Rup2.push(item.Y)
              tmArr2.push(item.X)
            }
          })
        })
      })
      params = {
        pid: this.pid[2],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p3= raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              Rup3.push(item.Y)
              tmArr3.push(item.X)
            }
          })
        })
      })
      params = {
        pid: this.pid[3],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p4= raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              Rup4.push(item.Y)
              tmArr4.push(item.X)
            }
          })
        })
      })
      params = {
        pid: this.pid[4],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p5= raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              Rup5.push(item.Y)
              tmArr5.push(item.X)
            }
          })
        })
      })
      params = {
        pid: this.pid[5],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p6=  raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              Rup6.push(item.Y)
              tmArr6.push(item.X)
            }
          })
        })
      })
      params = {
        pid: this.pid[6],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p7=  raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v ===0) {
              tmArr.push(item.X)
              Rup7.push(item.Y)
              tmArr7.push(item.X)
            }
          })
        })
      })
      params = {
        pid: this.pid[7],
        begin_date: this.begin_date,
        end_date: this.end_date
      }
      let p8= raoBaSeepPotential(params).then(res => {
        const data = JSON.parse(res.data)
        data.forEach(function(group, v) {
          (group.data).forEach(function(item) {
            item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
            if (v === 0) {
              tmArr.push(item.X)
              Rup8.push(item.Y)
              tmArr8.push(item.X)
            }
          })
        })
      })
      this.$axios.all([p1,p2,p3,p4,p5,p6,p7,p8]).then(() => {
        this.loading = false
        let tmp = []
        for(let i in tmArr){
          if(tmp.indexOf(tmArr[i])===-1){
            tmp.push(tmArr[i]);
          }
        }
        tmArr = tmp.sort()

        this.tableData= []
        for(let i = 0;i<tmArr.length;i++) {
          let tableValue = {
            tm: tmArr[i],
            Rup1: '',
            Rup2: '',
            Rup3: '',
            Rup4: '',
            Rup5: '',
            Rup6: '',
            Rup7: '',
            Rup8: '',
          }
          if(tmArr[i]=== tmArr1[i]) {
            tableValue.Rup1 = Rup1[i]
          }
          else {
            for( let j in tmArr1) {
              if(tmArr[i]===tmArr1[j]) {
                tableValue.Rup1 = Rup1[j]
              }
            }
          }
          if(tmArr[i]=== tmArr2[i]) {
            tableValue.Rup2 = Rup2[i]
          }
          else {
            for( let j in tmArr2) {
              if(tmArr[i]===tmArr2[j]) {
                tableValue.Rup2 = Rup2[j]
              }
            }
          }
          if(tmArr[i]=== tmArr3[i]) {
            tableValue.Rup3 = Rup3[i]
          }
          else {
            for( let j in tmArr3) {
              if(tmArr[i]===tmArr3[j]) {
                tableValue.Rup3 = Rup3[j]
              }
            }
          }
          if(tmArr[i]=== tmArr4[i]) {
            tableValue.Rup4 = Rup4[i]
          }
          else {
            for( let j in tmArr4) {
              if(tmArr[i]===tmArr4[j]) {
                tableValue.Rup4 = Rup4[j]
              }
            }
          }
          if(tmArr[i]===tmArr5[i]) {
            tableValue.Rup5 = Rup5[i]
          }
          else {
            for( let j in tmArr5) {
              if(tmArr[i]===tmArr5[j]) {
                tableValue.Rup5 = Rup5[j]
              }
            }
          }
          if(tmArr[i]===tmArr6[i]) {
            tableValue.Rup6 = Rup6[i]
          }
          else {
            for( let j in tmArr6) {
              if(tmArr[i]===tmArr6[j]) {
                tableValue.Rup6 = Rup6[j]
              }
            }
          }
          if(tmArr[i]===tmArr7[i]) {
            tableValue.Rup7 = Rup7[i]
          }
          else {
            for( let j in tmArr7) {
              if(tmArr[i]===tmArr7[j]) {
                tableValue.Rup7 = Rup7[j]
              }
            }
          }
          if(tmArr[i]===tmArr8[i]) {
            tableValue.Rup8 = Rup8[i]
          }
          else {
            for( let j in tmArr8) {
              if(tmArr[i]===tmArr8[j]) {
                tableValue.Rup8 = Rup8[j]
              }
            }
          }
          this.tableData.push(tableValue)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
