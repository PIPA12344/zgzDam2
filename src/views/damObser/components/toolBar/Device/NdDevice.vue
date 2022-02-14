<template>
 <span style="margin-left: 10px;">
    <span>测点编号：</span>
    <el-select v-model="pid" placeholder="请选择" @change="pidChanged" style="width:150px">
      <el-option
        v-for="(item) in ndDeviceGroup"
        :label="item"
        :value="item"
        :key="item"
      />
    </el-select>
  </span>
</template>

<script>
export default {
  name: "NdDevice",
  data() {
    return {
      pid: '径向12#坝段',
      ndDeviceGroup: ["径向12#坝段","径向16#坝段","径向20#坝段","径向3#坝段","径向6#坝段", "切向6#坝段",
        "切向12#坝段","切向16#坝段","切向20#坝段","切向3#坝段","切向6#坝段",]
    }
  },
  methods: {
    pidChanged(data) {
      this.pid = data
      console.log("pidAlreadyChanged");
      this.$emit('pidChanged', this.pid)
    },
  }
}
</script>

<style scoped>

</style>
