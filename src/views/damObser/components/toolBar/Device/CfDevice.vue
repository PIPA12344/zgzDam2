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
  name: "CfDevice",
  data() {
    return {
      pid: 'BMJ-a',
      rsDeviceGroup: ["BMJ-a","BMJ-b","J02-1a","J02-1b","J04-1a","J04-1b",
        "J04-2a","J04-2b","J06-1a","J06-1b","J06-2a","J06-3b","J06-4a","J06-4b",
        "J06-5b","J08-1a","J08-1b","J08-2a","J08-3b","J08-4a","J08-5a","J10-1a",
        "J10-2a","J10-3a","J10-3b","J10-4b","J10-6a","J10-6b","J12-1a","J12-1b",
        "J12-2a","J12-3a","J12-3b","J12-5b","J12-6a","J12-6b","J12-7b","J14-1b",
        "J14-2a","J14-2b","J14-3a","J14-3b","J14-5a","J14-5b","J14-6a","J14-6b",
        "J14-7a","J16-1a","J16-1b","J16-2a","J16-3a","J16-4a","J16-5a","J16-5b",
        "J18-4a","J18-4b","J20-1a","J20-2a","Ji05-1","Jj12-1","Jj18-1"]
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
