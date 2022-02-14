<template>
  <span>  选择日期：
    <el-date-picker
    v-model="stm"
    type="date"
    placeholder="开始时间"
    format="yyyy-MM-dd"
    style="width:150px;"
    @change="stmChanged"/>
  </span>
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'

export default {
  name: 'BeginDate',
  data() {
    return {
      stm: formatWithSeperator(new Date(new Date().getFullYear(), 0, 1), '/', ':').substring(0, 10)
    }
  },
  methods: {
    stmChanged() {
      this.$emit('stmChanged', this.stm)
    }
  }
}
</script>

<style scoped>

</style>
