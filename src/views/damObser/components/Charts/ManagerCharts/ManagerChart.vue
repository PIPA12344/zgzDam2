<template>
  <el-card style="margin: 0;padding: 0;">
    <el-table
      :height="imgH"
      :data="tableData"
      :header-cell-style="centerStyle"
      :cell-style="centerStyle"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="code"
        label="编号"
      />
      <el-table-column
        prop="upper"
        label="预警值(上限)"
      />
      <el-table-column
        prop="lower"
        label="预警值(下限)"
      />
      <el-table-column
        prop="autoUpload"
        label="自动发送"
      />
      <el-table-column
        prop="upload"
        label="手动发送"
      />
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" circle type="primary"
                     @click="handleSelectionChange(scope.$index,tableData)"/>
          <el-button size="mini" icon="el-icon-delete" circle type="danger"
                     @click.native.prevent="deleteRow(scope.$index, tableData)"/>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import {listByType, setMaxmin} from "@/api/dam/slfx";

  export default {
    name: "ManagerChart",
    computed: {
      centerStyle() {
        return "text-align: center";
      }
    },
    mounted() {
      //关闭视频弹窗
      if (this.$oWebControl) {
        this.$oWebControl.JS_HideWnd();
      }
      this.startAnalyze('QXND')
    },
    methods: {
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?(注：删除接口未接入)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          rows.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handlePreview(file) {

      },
      handleSelectionChange(index, tableData) {
        this.$prompt('请输入预警值（上限）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(\-|\+)?\d+(\.\d+)?$/,
          inputErrorMessage: '数字格式不正确！'
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '预警值（上限）设置为: ' + value
          });
          let params = {
            apply: tableData[index].apply,
            devicecd: tableData[index].code,
            effective: tableData[index].effective,
            frequency: tableData[index].frequency,
            maxv: value,
            minv: tableData[index].lower,
            submaxv: tableData[index].submaxv,
            subminv: tableData[index].subminv,
            valid: tableData[index].valid,
          }
          setMaxmin(params).then(res => {
            console.log(res);
            this.tableData[index].upper = value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          })
        }).then(() => {
          setTimeout(() => {
            this.$prompt('请输入预警值（下限）', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^(\-|\+)?\d+(\.\d+)?$/,
              inputErrorMessage: '数字格式不正确！'
            }).then(({value}) => {
              this.$message({
                type: 'success',
                message: '预警值（下限）设置为: ' + value
              })
              let params = {
                apply: tableData[index].apply,
                devicecd: tableData[index].code,
                effective: tableData[index].effective,
                frequency: tableData[index].frequency,
                maxv: tableData[index].upper,
                minv: value,
                submaxv: tableData[index].submaxv,
                subminv: tableData[index].subminv,
                valid: tableData[index].valid,
              }
              setMaxmin(params).then(res => {
                console.log(res)
                this.tableData[index].lower = value
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              })
              this.startAnalyze(this.treeId)
            })
          }, 300)
        })
      },
      startAnalyze(id) {
        let params = {
          rescd: this.rescd,
          typecd: id
        }
        this.treeId = id
        listByType(params).then(res => {
          console.log(res.data);
          this.tableData = []
          for (let i in res.data) {
            let tableValue = {
              code: res.data[i].devicecd,
              upper: res.data[i].maxv,
              lower: res.data[i].minv,
              autoUpload: '是',
              upload: '否',
              apply: res.data[i].apply,
              effective: res.data[i].effective,
              frequency: res.data[i].frequency,
              submaxv: res.data[i].submaxv,
              subminv: res.data[i].subminv,
              valid: res.data[i].valid,
            }
            this.tableData.push(tableValue)
          }
        })
      }
    },
    data() {
      return {
        imgH: document.body.clientHeight - 250,
        tableData: [],
        treeId: 'QXND'
      }
    }
  }
</script>

<style scoped>

</style>
