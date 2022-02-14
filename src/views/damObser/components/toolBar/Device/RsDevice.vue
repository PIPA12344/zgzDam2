<template>
  <span style="margin-left: 10px;">
    <span>测点编号：</span>
    <el-select v-model="pid" placeholder="请选择" @change="pidChanged" style="width:150px">
      <el-option
        v-for="(item) in rsDeviceGroup"
        :label="item"
        :value="item"
        :key="item"
      />
    </el-select>
  </span>
</template>

<script>
export default {
  name: "RsDevice",
  activated() {
    //关闭视频弹窗
    if (this.$oWebControl) {
      this.$oWebControl.JS_HideWnd();
    }
  },
  mounted() {
    //关闭视频弹窗
    if (this.$oWebControl) {
      this.$oWebControl.JS_HideWnd();
    }

  },
  data() {
    return {
      pid: 'Rup1',
      rsDeviceGroup: ["Rup1","Rup2","Rup3","Rup4","Rup5","Rup6","Rup7","Rup8"]
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
