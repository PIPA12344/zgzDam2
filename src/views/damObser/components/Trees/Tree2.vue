<template>
  <el-col :span="4" :xs="24">
    <el-card :style="{'height': listsH + 'px'}">
      <div slot="header" class="clearfix">
        <span>观测项目分类</span>
      </div>
      <div class="main-bio">
        <div class="tree-bio-section">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />
          <div class="tree-box">
            <el-tree
              style="margin-top: 10px;"
              :highlight-current="true"
              node-key="id"
              ref="tree"
              :default-expanded-keys="[1]"
              accordion
              :data="treeNodes"
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
  export default {
    name: 'Tree2',
    data() {
      return {
        listsH: document.body.clientHeight - 206,
        filterText: '',
        chartId: 'sl-yylxs',
        type: '',
        treeNodes: [
          {
            id: 1,
            icon: 'el-icon-s-order',
            label: '渗流分析',
            children: [
              {
                id: 'sl-yylxs',
                icon: 'el-icon-menu',
                label: '扬压力系数分析',
                children: []
              },
              // {
              //   id: 'sl-fbtfx',
              //   icon: 'el-icon-menu',
              //   label: '分布图分析',
              //   children: []
              // },
              // {
              //   id: 'sl-fbtfx_dh',
              //   icon: 'el-icon-menu',
              //   label: '分布图分析-动画演示',
              //   children: []
              // },
              {
                id: 'sl-xgxfx',
                icon: 'el-icon-menu',
                label: '相关性分析',
                children: []
              },
              {
                id: 'sl-zhxfx',
                icon: 'el-icon-menu',
                label: '滞后性分析',
                children: []
              }
            ]
          },
          {
            id: 2,
            icon: 'el-icon-s-order',
            label: '水位分析',
            children: [
              {
                id: 'sw-lzt-zk',
                icon: 'el-icon-menu',
                label: '蜡烛图分析-周K线图',
                children: []
              },
              {
                id: 'sw-lzt-yk',
                icon: 'el-icon-menu',
                label: '蜡烛图分析-月K线图',
                children: []
              },
              {
                id: 'sw-tzztj',
                icon: 'el-icon-menu',
                label: '特征值统计',
                children: []
              }
            ]
          },
          {
            id: 3,
            icon: 'el-icon-s-order',
            label: '绕渗分析',
            children: [
              {
                id: 'rs-wsfx',
                icon: 'el-icon-menu',
                label: '位势分析',
                children: []
              },
              {
                id: 'rs-xgxfx',
                icon: 'el-icon-menu',
                label: '相关性分析',
                children: []
              },
              {
                id: 'rs-zhxfx',
                icon: 'el-icon-menu',
                label: '滞后性分析',
                children: []
              }
            ]
          },
          {
            id: 4,
            icon: 'el-icon-s-order',
            label: '渗流量分析',
            children: [
              {
                id: 'sll-hyllfx',
                icon: 'el-icon-menu',
                label: '化引流量分析',
                children: []
              },
              {
                id: 'sll-xgxfx',
                icon: 'el-icon-menu',
                label: '相关性分析',
                children: []
              }
            ]
          },
          {
            id: 5,
            icon: 'el-icon-s-order',
            label: '侧缝分析',
            children: [
              {
                id: 'cf-swxgx',
                icon: 'el-icon-menu',
                label: '水位相关性分析',
                children: []
              },
              {
                id: 'cf-wdxgx',
                icon: 'el-icon-menu',
                label: '温度相关性分析',
                children: []
              }
            ]
          },
          // {
          //   id: 6,
          //   icon: 'el-icon-s-order',
          //   label: '挠度分析',
          //   children: [
          //     {
          //       id: 'nd-fbtfx',
          //       icon: 'el-icon-menu',
          //       label: '分布图分析',
          //       children: []
          //     },
          //     {
          //       id: 'nd-fbtfx-dh',
          //       icon: 'el-icon-menu',
          //       label: '分布图分析-动画演示',
          //       children: []
          //     }
          //   ]
          // },
          {
            id: 7,
            icon: 'el-icon-s-order',
            label: '应变分析',
            children: [
              {
                id: 'yb-swxgx',
                icon: 'el-icon-menu',
                label: '水位相关性分析',
                children: []
              },
              {
                id: 'yb-wdxgx',
                icon: 'el-icon-menu',
                label: '温度相关性分析',
                children: []
              }
            ]
          }
        ]
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      this.chooseFirst()
    },
    methods: {
      chooseFirst() {
        this.$nextTick(() => {  // 默认高亮选中节点
          this.$refs.tree.setCurrentKey("sl-yylxs");
        })
      },
      filterNode(value, data) {
        if (!value) {
          return true
        }
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        //根据树点击事件获取相应的toolBar类型以及对应的表格
        const id = data.id
        switch (id) {
          case 'sl-yylxs':
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'UP'
            this.chartId = 'sl-yylxs'
            break
          case 'sl-fbtfx':
            this.visibleStm = true
            this.visibleEtm = false
            this.chartId = 'sl-fbtfx'
            this.type = 'BJ'
            break
          case 'sl-fbtfx_dh':
            this.visibleStm = true
            this.visibleEtm = false
            this.type = 'BJ'
            this.chartId = 'sl-fbtfx-dh'
            break
          case 'sl-xgxfx':
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'UP'
            this.chartId = 'sl-xgxfx'
            break
          case 'sl-zhxfx':
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'UP'
            this.chartId = 'sl-zhxfx'
            break
          case 'sw-lzt-zk':
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'None'
            this.chartId = 'sw-lzt-zk'
            break
          case 'sw-lzt-yk':
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'None'
            this.chartId = 'sw-lzt-yk'
            break
          case 'sw-tzztj' :
            this.visibleStm = false
            this.visibleEtm = false
            this.type = 'Year'
            this.chartId = 'sw-tzztj'
            break
          case 'rs-wsfx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'Rup'
            this.chartId = 'rs-wsfx'
            break
          case 'rs-xgxfx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'Rup'
            this.chartId = 'rs-xgxfx'
            break
          case 'rs-zhxfx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'Rup'
            this.chartId = 'rs-zhxfx'
            break
          case 'sll-hyllfx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'WE'
            this.chartId = 'sll-hyllfx'
            break
          case 'sll-xgxfx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.type = 'WE'
            this.chartId = 'sll-xgxfx'
            break
          case 'cf-swxgx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.chartId = 'cf-swxgx'
            this.type = 'CF'
            break
          case 'cf-wdxgx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.chartId = 'cf-wdxgx'
            this.type = 'CF'
            break
          case 'nd-fbtfx' :
            this.visibleStm = true
            this.visibleEtm = false
            this.chartId = 'nd-fbtfx'
            this.type = 'ND'
            break
          case 'nd-fbtfx-dh' :
            this.visibleStm = true
            this.visibleEtm = false
            this.chartId = 'nd-fbtfx-dh'
            this.type = 'ND'
            break
          case 'yb-swxgx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.chartId = 'yb-swxgx'
            this.type = 'YB'
            break
          case 'yb-wdxgx' :
            this.visibleStm = true
            this.visibleEtm = true
            this.chartId = 'yb-wdxgx'
            this.type = 'YB'
            break
          default:
            break
        }
        //向父组件传递值（开始时间是否可见，结束时间是否可见，图表ID，测点类型）
        this.$emit('treeNodeClick', this.visibleStm, this.visibleEtm, this.chartId, this.type)
      }
    }
  }
</script>

<style scoped>

</style>
