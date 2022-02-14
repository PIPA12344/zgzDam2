<template>
  <span style="margin-left: 10px;">
    <span>请选择断面：</span>
    <el-select v-model="NS"  placeholder="请选择">
     <el-option v-for="item in damFoundation"
                :label="item"
                :value="item"/>
    </el-select>
  </span>
</template>

<script>
export default {
  name: 'DamDevice',
  data() {
    return {
      NS: '坝基',
      damFoundation: ['坝基']
    }
  }
}
</script>

<style scoped>

</style>
