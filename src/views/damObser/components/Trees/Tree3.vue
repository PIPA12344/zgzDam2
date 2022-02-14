<template>
  <el-col :span="4" :xs="24">
    <el-card :style="{'height': listsH + 'px'}">
      <div slot="header" class="clearfix">
        <span>{{topTitle}}</span>
      </div>
      <div class="main-bio" v-if="mainVisible">
        <div class="tree-bio-section">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <div class="tree-box">
            <el-tree
              style="margin-top: 10px;"
              :highlight-current="true"
              ref="tree"
              node-key="id"
              :data="treeNodes"
              accordion
              :filter-node-method="filterNode"
              @node-click="handleNodeClick">

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
    name: 'Tree3',
    components: {},
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    props: {},

    data() {
      return {
        listsH: document.body.clientHeight - 206,
        topTitle: '观测项目分类',
        mainVisible: true,
        treeNodes: [
          {
            label: '渗流量统计表',
            icon: 'el-icon-s-order',
            id: 'sll-table',
            children: [],
          },
          {
            label: '杨压力测压孔统计表',
            icon: 'el-icon-s-order',
            id: 'yyl-table',
            children: [],
          },
          {
            label: '绕坝渗流水位统计表',
            icon: 'el-icon-s-order',
            id: 'rbsl-table',
            children: [],
          }
        ],
        filterText: '',
      }
    },
    mounted() {
      this.chooseFirst()
    },
    methods: {
      chooseFirst() {
        this.$nextTick(() => {  // 默认高亮选中节点
          this.$refs.tree.setCurrentKey("sll-table");
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        this.$emit('handleNodeClick', data.id)
      },
      nodeContextMenu(event, data, node, elem) {

      }
    }
  }
</script>

<style scoped>
  .tree-box {
    margin-top: 10px;
  }
</style>
