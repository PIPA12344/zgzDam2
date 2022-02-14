<template>
  <span>选择年份：
    <el-date-picker
      v-model="year"
      type="year"
      placeholder="选择年"
      @change="yearChanged"></el-date-picker>
  </span>
</template>

<script>
export default {
  name: "ChooseYear",
  data() {
    return {
      year: '2020'
    }
  },
  methods: {
    yearChanged(data) {
      this.year = data
      this.$emit('yearChanged', this.year)
    }
  }
}
</script>

<style scoped>

</style>
