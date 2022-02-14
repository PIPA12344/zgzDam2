<template>
  <span style="margin-left: 10px;">
    <span>测点编号：</span>
    <el-select v-model="pid" placeholder="请选择" @change="pidChanged" style="width:150px">
      <el-option
        v-for="(item) in ybDeviceGroup"
        :label="item"
        :value="item"
        :key="item"
      />
    </el-select>
  </span>
</template>

<script>
export default {
  name: "YbDevice",
  data() {
    return {
      pid: 'S07-1(1)',
      ybDeviceGroup: ["S07-1(1)","S07-1(2)","S07-1(3)","S07-1(4)",
        "S07-1(5)","S07-2(1)","S07-2(2)","S07-2(3)","S07-2(4)","S07-2(5)",
        "S12-1(1)","S12-1(2)","S12-1(3)","S12-1(4)","S12-1(5)","S12-2(1)",
        "S12-2(2)","S12-2(3)","S12-2(4)", "S12-2(5)","S12-3(3)","S12-3(4)",
        "S12-3(5)","S12-4(1)","S12-4(2)","S12-4(3)","S12-4(4)","S12-4(5)",
        "S16-1(1)","S16-1(2)","S16-1(3)","S16-1(4)","S16-1(5)","S16-2(1)",
        "S16-2(2)","S16-2(3)","S16-2(4)","S16-2(5)",]
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
