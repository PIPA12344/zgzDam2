<template>
  <span style="margin-left: 10px;">
    <span>测点编号：</span>
    <el-select v-model="pid" placeholder="请选择" @change="pidChanged" style="width:150px">
      <el-option
        v-for="(item) in sllDeviceGroup"
        :label="item"
        :value="item"
        :key="item"
      />
    </el-select>
  </span>
</template>

<script>
export default {
  name: "SllDevice",
  data() {
    return {
      pid: 'WE1',
      sllDeviceGroup: ["WE1","WE2","WE3","WE4","WE5","WE6","WE7","WE8"]
    }
  },
  methods: {
    pidChanged(data) {
      this.pid = data
      this.$emit('pidChanged', this.pid)
    },
  }
}
</script>

<style scoped>

</style>
