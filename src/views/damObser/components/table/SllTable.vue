<template>
  <el-card class="mainContentStyleWithHeader">
    <el-table
      id="out-table"
      v-loading=loading
      :data="tableData"
      :header-cell-style="centerStyle"
      :height="imgH"
      :cell-style="centerStyle">
      <el-table-column
        prop="tm"
        label="日期"
      ></el-table-column>
      <el-table-column label="测点编号及渗流量(L/S)">
        <el-table-column
          prop="WE1"
          label="WE1"
        ></el-table-column>
        <el-table-column
          prop="WE2"
          label="WE2"
        ></el-table-column>
        <el-table-column
          prop="WE3"
          label="WE3"
        ></el-table-column>
        <el-table-column
          prop="WE4"
          label="WE4"
        ></el-table-column>
        <el-table-column
          prop="WE5"
          label="WE5"
        ></el-table-column>
        <el-table-column
          prop="WE6"
          label="WE6"
        ></el-table-column>
        <el-table-column
          prop="WE7"
          label="WE7"
        ></el-table-column>
        <el-table-column
          prop="WE8"
          label="WE8"
        ></el-table-column>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import {shenLiuAnalysis} from "@/api/dam/slfx";
  import {format} from "@/utils/datetime";

  export default {
    name: "SllTable",
    mounted() {
      //关闭视频弹窗
      if (this.$oWebControl) {
        this.$oWebControl.JS_HideWnd();
      }
      this.getTableData()
    },
    props: {
      stm: '',
      etm: ''
    },
    data() {
      return {
        imgH: document.body.clientHeight - 340,
        loading: true,
        pid: ['WE1', 'WE2', 'WE3', 'WE4', 'WE5', 'WE6', 'WE7', 'WE8'],
        begin_date: this.stm,
        end_date: this.etm,
        centerStyle: {
          textAlign: 'center'
        },
        tableData: []
      }
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
        let WE1 = []
        let WE2 = []
        let WE3 = []
        let WE4 = []
        let WE5 = []
        let WE6 = []
        let WE7 = []
        let WE8 = []
        let params = {
          pid: this.pid[0],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        console.log(params)
        let p1 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                tmArr1.push(item.X)
                WE1.push(item.Y)
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
        let p2 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE2.push(item.Y)
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
        let p3 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE3.push(item.Y)
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
        let p4 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE4.push(item.Y)
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
        let p5 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE5.push(item.Y)
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
        let p6 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE6.push(item.Y)
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
        let p7 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE7.push(item.Y)
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
        let p8 = shenLiuAnalysis(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                WE8.push(item.Y)
                tmArr8.push(item.X)
              }
            })
          })
        })
        this.$axios.all([p1, p2, p3, p4, p5, p6, p7, p8]).then(() => {
            this.loading = false
            var tmp = []
            for (let i in tmArr) {
              if (tmp.indexOf(tmArr[i]) === -1) {
                tmp.push(tmArr[i]);
              }
            }
            tmArr = tmp.sort()
            this.tableData = []
            for (let i = 0; i < tmArr.length; i++) {
              let tableValue = {
                tm: tmArr[i],
                WE1: '',
                WE2: '',
                WE3: '',
                WE4: '',
                WE5: '',
                WE6: '',
                WE7: '',
                WE8: '',
              }
              if (tmArr[i] === tmArr1[i]) {
                tableValue.WE1 = WE1[i]
              } else {
                for (let j in tmArr1) {
                  if (tmArr[i] === tmArr1[j]) {
                    tableValue.WE1 = WE1[i]
                  }
                }
              }
              if (tmArr[i] === tmArr2[i]) {
                tableValue.WE2 = WE2[i]
              } else {
                for (let j in tmArr2) {
                  if (tmArr[i] === tmArr2[j]) {
                    tableValue.WE2 = WE2[i]
                  }
                }
              }
              if (tmArr[i] === tmArr3[i]) {
                tableValue.WE3 = WE3[i]
              } else {
                for (let j in tmArr3) {
                  if (tmArr[i] === tmArr3[j]) {
                    tableValue.WE3 = WE3[i]
                  }
                }
              }
              if (tmArr[i] === tmArr4[i]) {
                tableValue.WE4 = WE4[i]
              } else {
                for (let j in tmArr4) {
                  if (tmArr[i] === tmArr4[j]) {
                    tableValue.WE4 = WE4[i]
                  }
                }
              }
              if (tmArr[i] === tmArr5[i]) {
                tableValue.WE5 = WE5[i]
              } else {
                for (let j in tmArr5) {
                  if (tmArr[i] === tmArr5[j]) {
                    tableValue.WE5 = WE5[i]
                  }
                }
              }
              if (tmArr[i] === tmArr6[i]) {
                tableValue.WE6 = WE6[i]
              } else {
                for (let j in tmArr6) {
                  if (tmArr[i] === tmArr6[j]) {
                    tableValue.WE6 = WE6[i]
                  }
                }
              }
              if (tmArr[i] === tmArr7[i]) {
                tableValue.WE7 = WE7[i]
              } else {
                for (let j in tmArr7) {
                  if (tmArr[i] === tmArr7[j]) {
                    tableValue.WE7 = WE7[i]
                  }
                }
              }
              if (tmArr[i] === tmArr8[i]) {
                tableValue.WE8 = WE8[i]
              } else {
                for (let j in tmArr8) {
                  if (tmArr[i] === tmArr8[j]) {
                    tableValue.WE8 = WE8[i]
                  }
                }
              }
              this.tableData.push(tableValue)
            }
          }
        )

      }

    }
  }
</script>

<style scoped>

</style>
