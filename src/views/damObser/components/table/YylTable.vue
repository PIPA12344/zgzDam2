<template>
  <el-card class="mainContentStyleWithHeader">
    <el-table
      id="out-table"
      v-loading=loading
      :height="imgH"
      :data="tableData"
      :header-cell-style="centerStyle"
      :cell-style="centerStyle"
      style="width: 100%">
      <el-table-column
        prop="tm"
        label="日期"
      ></el-table-column>
      <el-table-column label="测点编号及扬压力(L/S)">
        <el-table-column
          prop="UP01"
          label="UP01"/>
        <el-table-column
          prop="UP02"
          label="UP02"/>
        <el-table-column
          prop="UP03"
          label="UP03"/>
        <el-table-column
          prop="UP04"
          label="UP04"/>
        <el-table-column
          prop="UP05"
          label="UP05"/>
        <el-table-column
          prop="UP06"
          label="UP06"/>
        <el-table-column
          prop="UP07"
          label="UP07"/>
        <el-table-column
          prop="UP08"
          label="UP08"/>
        <el-table-column
          prop="UP09"
          label="UP09"/>
        <el-table-column
          prop="UP10"
          label="UP10"/>
        <el-table-column
          prop="UP11"
          label="UP11"/>
        <el-table-column
          prop="UP12"
          label="UP12"/>
        <el-table-column
          prop="UP13"
          label="UP13"/>
        <el-table-column
          prop="UP14"
          label="UP14"/>
        <el-table-column
          prop="UP15"
          label="UP15"/>
        <el-table-column
          prop="UP16"
          label="UP16"/>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import {upliftedPressure} from "@/api/dam/slfx";
  import {format} from "@/utils/datetime";

  export default {
    data() {
      return {
        imgH: document.body.clientHeight - 340,
        loading: true,
        pid: ['UP01', 'UP02', 'UP03', 'UP04', 'UP05', 'UP06', 'UP07', 'UP08', 'UP09', 'UP10', 'UP11', 'UP12', 'UP13', 'UP14', 'UP15', 'UP16'],
        begin_date: this.stm,
        end_date: this.etm,
        centerStyle: {
          textAlign: 'center'
        },
        tableData: [],
      }
    },
    props: {
      stm: '',
      etm: ''
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
        let tmArr9 = []
        let tmArr10 = []
        let tmArr11 = []
        let tmArr12 = []
        let tmArr13 = []
        let tmArr14 = []
        let tmArr15 = []
        let tmArr16 = []
        let UP01 = []
        let UP02 = []
        let UP03 = []
        let UP04 = []
        let UP05 = []
        let UP06 = []
        let UP07 = []
        let UP08 = []
        let UP09 = []
        let UP10 = []
        let UP11 = []
        let UP12 = []
        let UP13 = []
        let UP14 = []
        let UP15 = []
        let UP16 = []
        let params = {
          pid: this.pid[0],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        console.log(params)
        let p1 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                tmArr1.push(item.X)
                UP01.push(item.Y)
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
        let p2 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP02.push(item.Y)
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
        let p3 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP03.push(item.Y)
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
        let p4 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP04.push(item.Y)
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
        let p5 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP05.push(item.Y)
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
        let p6 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP06.push(item.Y)
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
        let p7 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP07.push(item.Y)
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
        let p8 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP08.push(item.Y)
                tmArr8.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[8],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p9 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP09.push(item.Y)
                tmArr9.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[9],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p10 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP10.push(item.Y)
                tmArr10.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[10],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p11 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP11.push(item.Y)
                tmArr11.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[11],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p12 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP12.push(item.Y)
                tmArr12.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[12],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p13 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP13.push(item.Y)
                tmArr13.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[13],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p14 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP14.push(item.Y)
                tmArr14.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[14],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p15 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP15.push(item.Y)
                tmArr15.push(item.X)
              }
            })
          })
        })
        params = {
          pid: this.pid[15],
          begin_date: this.begin_date,
          end_date: this.end_date
        }
        let p16 = upliftedPressure(params).then(res => {
          const data = JSON.parse(res.data)
          data.forEach(function (group, v) {
            (group.data).forEach(function (item) {
              item.X = format(new Date((item.X - 621355968000000000) / 10000)).substring(0, 10)
              if (v === 0) {
                tmArr.push(item.X)
                UP16.push(item.Y)
                tmArr16.push(item.X)
              }
            })
          })
        })

        this.$axios.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16]).then(() => {
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
                UP01: '',
                UP02: '',
                UP03: '',
                UP04: '',
                UP05: '',
                UP06: '',
                UP07: '',
                UP08: '',
                UP09: '',
                UP10: '',
                Up11: '',
                UP12: '',
                UP13: '',
                UP14: '',
                UP15: '',
                UP16: '',
              }
              if (tmArr[i] === tmArr1[i]) {
                tableValue.UP01 = UP01[i]
              } else {
                for (let j in tmArr1) {
                  if (tmArr[i] === tmArr1[j]) {
                    tableValue.UP01 = UP01
                  }
                }
              }
              if (tmArr[i] === tmArr2[i]) {
                tableValue.UP02 = UP02[i]
              } else {
                for (let j in tmArr2) {
                  if (tmArr[i] === tmArr2[j]) {
                    tableValue.UP02 = UP02[i]
                  }
                }
              }
              if (tmArr[i] === tmArr3[i]) {
                tableValue.UP03 = UP03[i]
              } else {
                for (let j in tmArr3) {
                  if (tmArr[i] === tmArr3[j]) {
                    tableValue.UP03 = UP03[i]
                  }
                }
              }
              if (tmArr[i] === tmArr4[i]) {
                tableValue.UP04 = UP04[i]
              } else {
                for (let j in tmArr4) {
                  if (tmArr[i] === tmArr4[j]) {
                    tableValue.UP04 = UP04[i]
                  }
                }
              }
              if (tmArr[i] === tmArr5[i]) {
                tableValue.UP05 = UP05[i]
              } else {
                for (let j in tmArr5) {
                  if (tmArr[i] === tmArr5[j]) {
                    tableValue.UP05 = UP05[i]
                  }
                }
              }
              if (tmArr[i] === tmArr6[i]) {
                tableValue.UP06 = UP06[i]
              } else {
                for (let j in tmArr6) {
                  if (tmArr[i] === tmArr6[j]) {
                    tableValue.UP06 = UP06[i]
                  }
                }
              }
              if (tmArr[i] === tmArr7[i]) {
                tableValue.UP07 = UP07[i]
              } else {
                for (let j in tmArr7) {
                  if (tmArr[i] === tmArr7[j]) {
                    tableValue.UP07 = UP07[i]
                  }
                }
              }
              if (tmArr[i] === tmArr8[i]) {
                tableValue.UP08 = UP08[i]
              } else {
                for (let j in tmArr8) {
                  if (tmArr[i] === tmArr8[j]) {
                    tableValue.UP08 = UP08[i]
                  }
                }
              }
              if (tmArr[i] === tmArr9[i]) {
                tableValue.UP09 = UP09[i]
              } else {
                for (let j in tmArr9) {
                  if (tmArr[i] === tmArr9[j]) {
                    tableValue.UP09 = UP09[i]
                  }
                }
              }
              if (tmArr[i] === tmArr10[i]) {
                tableValue.UP10 = UP10[i]
              } else {
                for (let j in tmArr10) {
                  if (tmArr[i] === tmArr10[j]) {
                    tableValue.UP10 = UP10[i]
                  }
                }
              }
              if (tmArr[i] === tmArr11[i]) {
                tableValue.UP11 = UP11[i]
              } else {
                for (let j in tmArr11) {
                  if (tmArr[i] === tmArr11[j]) {
                    tableValue.UP11 = UP11[i]
                  }
                }
              }
              if (tmArr[i] === tmArr12[i]) {
                tableValue.UP12 = UP12[i]
              } else {
                for (let j in tmArr12) {
                  if (tmArr[i] === tmArr12[j]) {
                    tableValue.UP12 = UP12[i]
                  }
                }
              }
              if (tmArr[i] === tmArr13[i]) {
                tableValue.UP13 = UP13[i]
              } else {
                for (let j in tmArr13) {
                  if (tmArr[i] === tmArr13[j]) {
                    tableValue.UP14 = UP14[i]
                  }
                }
              }
              if (tmArr[i] === tmArr14[i]) {
                tableValue.UP14 = UP14[i]
              } else {
                for (let j in tmArr14) {
                  if (tmArr[i] === tmArr14[j]) {
                    tableValue.UP14 = UP14[i]
                  }
                }
              }
              if (tmArr[i] === tmArr15[i]) {
                tableValue.UP15 = UP15[i]
              } else {
                for (let j in tmArr15) {
                  if (tmArr[i] === tmArr15[j]) {
                    tableValue.UP15 = UP15[i]
                  }
                }
              }
              if (tmArr[i] === tmArr16[i]) {
                tableValue.UP16 = UP16[i]
              } else {
                for (let j in tmArr16) {
                  if (tmArr[i] === tmArr16[j]) {
                    tableValue.UP16 = UP16[i]
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
