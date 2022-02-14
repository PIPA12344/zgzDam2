/<template>
  <div class="box">
    <el-row :gutter="10">
      <tree3 @handleNodeClick="handleNodeClick"/>
      <el-col :span="20" :xs="24">
        <tool-bar3 @startAnalyze="startAnalyze" @stmChanged="stmChanged" @etmChanged="etmChanged"
                   @exportExcel="exportExcel"/>
        <component :is="tableId" :ref="tableId" :stm="stm" :etm="etm"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tree3 from "@/views/damObser/components/Trees/Tree3";
import YylTable from "@/views/damObser/components/table/YylTable";
import RbslTable from "@/views/damObser/components/table/RbslTable";
import SllTable from "@/views/damObser/components/table/SllTable";
import ToolBar3 from "@/views/damObser/components/toolBar/ToolBar3";
import {formatWithSeperator} from "@/utils/datetime";

export default {
  components: {
    Tree3,
    YylTable,
    RbslTable,
    SllTable,
    ToolBar3,
  },
  props: {},
  data() {
    return {
      tableId: 'SllTable',
      stm: formatWithSeperator(new Date(new Date().getFullYear(), 0, 1), '/', ':').substring(0, 10),
      etm: formatWithSeperator(new Date(), '/', ':').substring(0, 10),
    }
  },
  methods: {
    handleNodeClick(data) {
      this.tableId = data
    },
    startAnalyze() {
      this.$refs[this.tableId].getTableData()
    },
    stmChanged(date) {
      this.stm = date
      console.log(this.stm);
    },
    etmChanged(date) {
      this.etm = date
      console.log(this.etm);
    },
    exportExcel() {
      console.log('第一层')
      this.$refs[this.tableId].exportExcel()
    }
  }
}
</script>

<style scoped>
.box {
  /*margin: 5px;*/
}
</style>
