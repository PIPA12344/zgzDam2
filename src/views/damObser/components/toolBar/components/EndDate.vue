<template>
  <el-date-picker
    v-model="etm"
    type="date"
    placeholder="结束时间"
    format="yyyy-MM-dd"
    style="width:150px;"
    @change="etmChanged"
  />
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'

export default {
  name: 'EndDate',
  data() {
    return {
      etm: formatWithSeperator(new Date(), '/', ':').substring(0, 10)
    }
  },
  methods: {
    etmChanged(data) {
      this.$emit('etmChanged', this.etm)
    }
  }
}
</script>

<style scoped>

</style>
