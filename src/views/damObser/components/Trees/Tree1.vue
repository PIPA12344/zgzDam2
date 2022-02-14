<template>
  <el-col :span="4" :xs="24">
    <el-card :style="{'height': listsH + 'px'}">
      <div slot="header" class="clearfix">
        <span>{{ topTitle }}</span>
      </div>
      <div v-if="mainVisible" class="main-bio">
        <div class="tree-bio-section">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />
          <div class="tree-box">
            <el-tree
              :highlight-current="true"
              :default-expanded-keys="defaultShowNodes"
              node-key="id"
              :data="treeNodes"
              ref="tree"
              :props="defaultProps"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <i :class="data.icon" style="color: rgb(24,144,255); margin-right: 10px;"></i>{{ data.label }}
                  <i v-if="data.warncount != 0" style="color: red;font-style: normal;position: absolute;right: 10px;">{{data.warncount}}</i>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
  import {getRedCountList} from '@/api/dam/slfx'

  export default {
    components: {},
    props: {},
    data() {
      return {
        listsH: document.body.clientHeight - 206,
        filterText: '',
        res: '',
        bxgcWarnCount: 0,
        slgcWarnCount: 0,
        ylblWarnCount: 0,
        hjlgcWarnCount: 0,
        warnId: [],
        warnCount: [],
        warnPoint: [],
        alarmPoint: [],
        topTitle: '观测项目分类',
        mainVisible: true,
        treeNodes: [
          {
            id: 'BXGC',
            label: '加载中...',
            children: [
              {
                children: [{}, {}, {}, {}, {}]
              },
              {
                children: [{}, {id: "JFBH",}]
              },
              {},
            ]
          },
          {
            label: '加载中...',
            children: [{}, {}, {}, {}]
          },
          {
            label: '加载中...',
            children: [{}, {},
              {
                children: [{}, {}]
              }
            ]
          },
          {
            label: '加载中...',
            children: [{}, {}, {}]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultShowNodes: ['BXGC', 'JFBH'],
      }

    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      //关闭视频弹窗
      if (this.$oWebControl) {
        this.$oWebControl.JS_HideWnd();
      }
      this.triggerEvent()
    },
    methods: {
      triggerEvent() {
        this.getRedCountList()
      },
      // 树的查询
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getRedCountList() {
        const params = {
          rescd: this.rescd
        }
        getRedCountList(params).then(res => {
          this.res = res
          const tempTree = this.treeNodes
          let top = 0;
          let bxgc = 0;
          let slgc = 0;
          let ylbl = 0;
          let hjlgc = 0;
          let btwy = 0;
          let jfbh = 0;
          let sll = 0
          let bxgcWarnCount = 0;
          let slgcWarnCount = 0;
          let ylblWarnCount = 0;
          let hjlgcWarnCount = 0
          this.warnId = []
          // 遍历接口数据导入观测项目类型
          for (let i in res.data) {
            res.data[i].icon = 'el-icon-s-order';
            switch (res.data[i].highlevel) {
              case 'top' :
                if (res.data[i].typecd === 'BXGC') {
                  tempTree[0].label = res.data[i].typenm
                  tempTree[0].id = res.data[i].typecd
                  tempTree[0].icon = 'el-icon-s-order'
                  tempTree[0].warncount = res.data[i].warncount
                  break
                } else if (res.data[i].typecd === 'SLGC') {
                  tempTree[2].label = res.data[i].typenm
                  tempTree[2].id = res.data[i].typecd
                  tempTree[2].icon = 'el-icon-s-order'
                  tempTree[2].warncount = res.data[i].warncount
                  break
                } else if (res.data[i].typecd === 'HJLGC') {
                  tempTree[1].label = res.data[i].typenm
                  tempTree[1].id = res.data[i].typecd
                  tempTree[1].icon = 'el-icon-s-order'
                  tempTree[1].warncount = res.data[i].warncount
                  break
                } else {
                  tempTree[3].label = res.data[i].typenm
                  tempTree[3].id = res.data[i].typecd
                  tempTree[3].icon = 'el-icon-s-order'
                  tempTree[3].warncount = res.data[i].warncount
                  break
                }
              case 'BXGC' :
                tempTree[0].children[bxgc].label = res.data[i].typenm
                tempTree[0].children[bxgc].id = res.data[i].typecd
                tempTree[0].children[bxgc].icon = 'el-icon-menu'
                tempTree[0].children[bxgc].warncount = res.data[i].warncount

                if (res.data[i].warncount !== 0) {
                  bxgcWarnCount = bxgcWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                bxgc++
                break
              case 'SLGC' :
                tempTree[2].children[slgc].label = res.data[i].typenm
                tempTree[2].children[slgc].id = res.data[i].typecd
                tempTree[2].children[slgc].icon = 'el-icon-menu'
                tempTree[2].children[slgc].warncount = res.data[i].warncount
                slgc++
                if (res.data[i].warncount !== 0) {
                  slgcWarnCount = slgcWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                break
              case 'YLBLWDGC' :
                tempTree[3].children[ylbl].label = res.data[i].typenm
                tempTree[3].children[ylbl].id = res.data[i].typecd
                tempTree[3].children[ylbl].icon = 'el-icon-menu'
                tempTree[3].children[ylbl].warncount = res.data[i].warncount
                ylbl++
                if (res.data[i].warncount !== 0) {
                  ylblWarnCount = ylblWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                break
              case 'HJLGC' :
                tempTree[1].children[hjlgc].label = res.data[i].typenm
                tempTree[1].children[hjlgc].id = res.data[i].typecd
                tempTree[1].children[hjlgc].icon = 'el-icon-menu'
                tempTree[1].children[hjlgc].warncount = res.data[i].warncount
                hjlgc++
                if (res.data[i].warncount !== 0) {
                  hjlgcWarnCount = hjlgcWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                break
              case 'BTWY' :
                tempTree[0].children[0].children[btwy].label = res.data[i].typenm
                tempTree[0].children[0].children[btwy].id = res.data[i].typecd
                tempTree[0].children[0].children[btwy].icon = 'el-icon-menu'
                tempTree[0].children[0].children[btwy].warncount = res.data[i].warncount

                btwy++
                if (res.data[i].warncount !== 0) {
                  bxgcWarnCount = bxgcWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                break
              case 'JFBH' :
                tempTree[0].children[1].children[jfbh].label = res.data[i].typenm
                tempTree[0].children[1].children[jfbh].id = res.data[i].typecd
                tempTree[0].children[1].children[jfbh].icon = 'el-icon-menu'
                tempTree[0].children[1].children[jfbh].warncount = res.data[i].warncount
                jfbh++
                if (res.data[i].warncount !== 0) {
                  bxgcWarnCount = bxgcWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                break
              case 'SLL' :
                tempTree[2].children[2].children[sll].label = res.data[i].typenm
                tempTree[2].children[2].children[sll].id = res.data[i].typecd
                tempTree[2].children[2].children[sll].icon = 'el-icon-menu'
                tempTree[2].children[2].children[sll].warncount = res.data[i].warncount
                sll++
                if (res.data[i].warncount !== 0) {
                  slgcWarnCount = slgcWarnCount + res.data[i].warncount
                  this.warnId.push(res.data[i].typecd)
                  this.warnCount.push(res.data[i].warncount)
                  this.warnPoint.push(res.data[i].message.split(';'))
                }
                break
              default :
                break
            }
          }
          // 将获取的二维数组最后一位无效数据去除
          for (const i in this.warnPoint) {
            this.warnPoint[i].pop()
          }
          // 二维数组转一维数组
          for (const i in this.warnPoint) {
            for (const j in this.warnPoint[i]) {
              this.alarmPoint.push(this.warnPoint[i][j])
            }
          }
          this.$emit('sendWarnPoint', this.alarmPoint)
          this.bxgcWarnCount = bxgcWarnCount
          this.slgcWarnCount = slgcWarnCount
          this.ylblWarnCount = ylblWarnCount
          this.hjlgcWarnCount = hjlgcWarnCount

          this.$nextTick(() => {  // 默认高亮选中节点
            this.$refs.tree.setCurrentKey("BXGC");
            setTimeout(() => {
              this.$refs.tree.setCurrentKey("JFBH");
              //默认加载这个地图
              this.handleNodeClick(this.$refs["tree"].store.currentNode.data);

            }, 500)
          })

        }).catch(err => {
          console.log(err)
        })
      },
      // 自定义Tree内容
      // renderContent(h, {node, data}) {
      //   switch (data.id) {
      //     case 'YL' :
      //       return (
      //         < span
      //       className = 'custom-tree-node'
      //       style = 'width: 100%' >
      //         < span > < i
      //       className = 'el-icon-s-order'
      //       style = 'color: rgb(24,144,255); margin-right: 10px;' > < /i>{node.label}</s
      //       pan >
      //       < span
      //       style = 'color: red;float: right' > 暂无数据 < /span>
      //         < /span>
      //     )
      //     case 'BXGC' :
      //       if (this.bxgcWarnCount) {
      //         return (
      //           < span
      //         className = 'custom-tree-node'
      //         style = 'width: 100%' >
      //           < span > {node.label} < /span>
      //           < span
      //         style = 'color: red;float: right' > {this.bxgcWarnCount} < /span>
      //           < /span>
      //       )
      //       } else {
      //         return (
      //           < span
      //         className = 'custom-tree-node' >
      //           < span > < i
      //         className = 'el-icon-s-order'
      //         style = 'color: rgb(24,144,255); margin-right: 10px;' > < /i>{node.label}</s
      //         pan >
      //         < /span>
      //       )
      //       }
      //     case 'SLGC':
      //       if (this.slgcWarnCount) {
      //         return (
      //           < span
      //         className = 'custom-tree-node'
      //         style = 'width: 100%' >
      //           < span > {node.label} < /span>
      //           < span
      //         style = 'color: red;float: right' > {this.slgcWarnCount} < /span>
      //           < /span>
      //       )
      //       } else {
      //         return (
      //           < span
      //         className = 'custom-tree-node' >
      //           < span > {node.label} < /span>
      //           < /span>
      //       )
      //       }
      //     case 'YLBLWDGC' :
      //       if (this.ylblWarnCount) {
      //         return (
      //           < span
      //         className = 'custom-tree-node'
      //         style = 'width: 100%' >
      //           < span > {node.label} < /span>
      //           < span
      //         style = 'color: red;float: right' > {this.ylblWarnCount} < /span>
      //           < /span>
      //       )
      //       } else {
      //         return (
      //           < span
      //         className = 'custom-tree-node' >
      //           < span > {node.label} < /span>
      //           < /span>
      //       )
      //       }
      //     case 'HJLGC' :
      //       if (this.hjlgcWarnCount) {
      //         return (
      //           < span
      //         className = 'custom-tree-node'
      //         style = 'width: 100%' >
      //           < span > {node.label} < /span>
      //           < span
      //         style = 'color: red;float: right' > {this.hjlgcWarnCount} < /span>
      //           < /span>
      //       )
      //       } else {
      //         return (
      //           < span
      //         className = 'custom-tree-node' >
      //           < span > {node.label} < /span>
      //           < /span>
      //       )
      //       }
      //     default :
      //       if (this.warnId.indexOf(data.id) !== -1) {
      //         return (
      //           < span
      //         className = 'custom-tree-node'
      //         style = 'width: 100%' >
      //           < span
      //         style = 'color: red' > {node.label} < /span>
      //           < span
      //         style = 'color: red;float: right' > {this.warnCount[this.warnId.indexOf(data.id)]} < /span>
      //           < /span>
      //       )
      //       } else {
      //         return (
      //           < span
      //         className = 'custom-tree-node' >
      //           < span > {node.label} < /span>
      //           < /span>
      //       )
      //       }
      //   }
      // },
      // Tree点击事件
      handleNodeClick(nodeData) {
        let apiData
        for (let i = 0; i < this.res.data.length; i++) {
          if (nodeData.id === this.res.data[i].typecd) {
            apiData = this.res.data[i]
            break
          }
        }
        this.$emit('handleNodeClick', apiData, nodeData, this.res.data)
      }
    }
  }
</script>

<style scoped>
  .tree-box {
    margin-top: 10px;
  }
</style>

<style>
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #fbec88;
  }

  .el-tree {
    background-color: initial;
  }
</style>


