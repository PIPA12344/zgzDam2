<template>
  <el-container>
    <el-header>
      <nav-menu @selectIndex="selectPage"></nav-menu>
    </el-header>
    <component :is="activePage" style="height: 800px"></component>
  </el-container>
</template>

<script>
import NavMenu from "@/views/damObser/components/NavMenu";
import SubPage1 from "@/views/damObser/subPage/SubPage1";
import SubPage2 from "@/views/damObser/subPage/SubPage2";
import SubPage3 from "@/views/damObser/subPage/SubPage3";
import SubPage4 from "@/views/damObser/subPage/SubPage4";
export default {
  name: "index",
  components: {
    NavMenu,
    SubPage1,
    SubPage2,
    SubPage3,
    SubPage4
  },
  data() {
    return {
      activePage: "subPage1",
    }
  },
  methods: {
    selectPage(page) {
      this.activePage = page
    }
  }
}
</script>

<style scoped>

</style>
