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
              ref="tree"
              :data="treeNodes"
              accordion
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <i :class="data.icon" style="color: rgb(24,144,255); margin-right: 10px;"></i>{{ data.label }}
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
    name: 'Tree5',
    components: {},
    props: {},
    data() {
      return {
        listsH: document.body.clientHeight - 206,
        res: '',
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
            children: [{},
              {
                children: [{}, {}]
              },
              {}
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
        filterText: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
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
          // 遍历接口数据导入观测项目类型
          for (let i in res.data) {
            console.log('循环开始')
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
                bxgc++
                break
              case 'SLGC' :
                tempTree[2].children[slgc].label = res.data[i].typenm
                tempTree[2].children[slgc].id = res.data[i].typecd
                tempTree[2].children[slgc].icon = 'el-icon-menu'
                tempTree[2].children[slgc].warncount = res.data[i].warncount
                slgc++
                break
              case 'YLBLWDGC' :
                tempTree[3].children[ylbl].label = res.data[i].typenm
                tempTree[3].children[ylbl].id = res.data[i].typecd
                tempTree[3].children[ylbl].icon = 'el-icon-menu'
                tempTree[3].children[ylbl].warncount = res.data[i].warncount
                ylbl++
                break
              case 'HJLGC' :
                tempTree[1].children[hjlgc].label = res.data[i].typenm
                tempTree[1].children[hjlgc].id = res.data[i].typecd
                tempTree[1].children[hjlgc].icon = 'el-icon-menu'
                tempTree[1].children[hjlgc].warncount = res.data[i].warncount
                hjlgc++
                break
              case 'BTWY' :
                tempTree[0].children[0].children[btwy].label = res.data[i].typenm
                tempTree[0].children[0].children[btwy].id = res.data[i].typecd
                tempTree[0].children[0].children[btwy].icon = 'el-icon-menu'
                tempTree[0].children[0].children[btwy].warncount = res.data[i].warncount
                btwy++
                break
              case 'JFBH' :
                tempTree[0].children[1].children[jfbh].label = res.data[i].typenm
                tempTree[0].children[1].children[jfbh].id = res.data[i].typecd
                tempTree[0].children[1].children[jfbh].icon = 'el-icon-menu'
                tempTree[0].children[1].children[jfbh].warncount = res.data[i].warncount
                jfbh++
                break
              case 'SLL' :
                tempTree[2].children[1].children[sll].label = res.data[i].typenm
                tempTree[2].children[1].children[sll].id = res.data[i].typecd
                tempTree[2].children[1].children[sll].icon = 'el-icon-menu'
                tempTree[2].children[1].children[sll].warncount = res.data[i].warncount
                sll++
                break
              default :
                break
            }
          }

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
      // renderContent(h, { node, data }) {
      //   if (data.id === 'YL') {
      //     return (
      //       <span className='custom-tree-node' style='width: 100%'>
      //         <span>{node.label}</span>
      //         <span style='color: red;float: right'> 暂无数据</span>
      //       </span>
      //     )
      //   }
      //   if (!node.data.children) {
      //     return (
      //       <span className='custom-tree-node' style='width: 100%'>
      //         <span>{node.label}</span>
      //       </span>
      //     )
      //   } else if (node.data.children) {
      //     return (
      //       <span className='custom-tree-node'>
      //         <span>{node.label}</span>
      //       </span>
      //     )
      //   }
      // },
      // Tree点击事件
      handleNodeClick(nodeData) {
        this.$emit('handleNodeClick', nodeData)
      }
    }
  }
</script>

<style scoped>
  .tree-box {
    margin-top: 10px;
  }
</style>

