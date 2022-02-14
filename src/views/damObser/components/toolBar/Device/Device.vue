<template>
  <span style="margin-left: 10px;">
    <span>测点编号：</span>
    <el-select v-model="pid" placeholder="请选择" @change="pidChanged" style="width:150px">
      <el-option
        v-for="item in deviceGroup"
        :key="item.devicecd"
        :value="item.devicecd"
        :label="item.devicecd"
      />
    </el-select>
  </span>
</template>

<script>
import { listByType } from '@/api/dam/slfx'

export default {
  name: 'Device',
  data() {
    return {
      pid: 'UP01',
      deviceGroup: {}
    }
  },
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
    this.listUP()
  },
  methods: {
    listUP() {
      const params = {
        rescd: this.rescd,
        typecd: 'UP'
      }
      console.log(params)
      listByType(params).then(res => {
        if (res.code == 0) {
          (res.data).forEach(function(item, v) {
            const devicecd = item.devicecd
            const index = devicecd.indexOf('P')
            let num = devicecd.substring(index + 1, devicecd.length)
            if (num < 10) {
              num = '0' + num
            }
            item.devicecd = 'UP' + num
          })
          this.deviceGroup = res.data
          this.pid = res.data[0].devicecd
        }
      })
    },
    pidChanged(data) {
      this.pid = data
      console.log(data);
      this.$emit('pidChanged', this.pid)
    }
  }
}
</script>

<style scoped>

</style>
