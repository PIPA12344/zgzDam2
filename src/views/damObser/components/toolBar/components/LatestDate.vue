<template>
  <span style="margin-left: 20px;">
    <i>{{projName}}</i>
    <i style="margin-left: 10px;">最新数据时间：{{latestDate}}</i>
  </span>
</template>

<script>
export default {
  name: "LatestDate",
  props: {
    projName: '',
    latestDate: '',
  }
}
</script>

<style scoped>

</style>
