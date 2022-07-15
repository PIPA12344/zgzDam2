<template>
  <div style="width: 100%">
    <span v-for="item in pointAttributes" :style="item" v-show="item.active==='normal'"
          @click="pointClick(item.devicecd,item.marginLeft,item.marginTop)">
      <img :src="iconUrl"
           :alt="item.devicecd">
      <span class="point-val">{{item.value}}</span>
    </span>
    <span v-for="item in pointAttributes" :style="item" v-show="item.active==='deactivate'"
          @click="pointClick(item.devicecd,item.marginLeft,item.marginTop)">
      <img :src="iconUrl"
           :alt="item.devicecd"/>
      <span class="point-val">{{item.value}}</span>
    </span>
    <span v-for="item in pointAttributes" :style="item" v-show="item.active==='alarm'"
          @click="pointClick(item.devicecd,item.marginLeft,item.marginTop)">
      <img :src="iconWarnUrl"
           :alt="item.devicecd">
      <span class="point-val">{{item.value}}</span>
    </span>
    <!--<img :src="iconUrl" v-show="item.active==='normal'" v-for="item in pointAttributes" :style="item"-->
    <!--@click="pointClick(item.devicecd,item.marginLeft,item.marginTop)" :alt="item.devicecd">-->
    <!--<img :src="iconUrl" v-show="item.active==='deactivate'" v-for="item in pointAttributes" :style="item"-->
    <!--@click="pointClick(item.devicecd,item.marginLeft,item.marginTop)" :alt="item.devicecd"/>-->
    <!--<img :src="iconWarnUrl" v-show="item.active==='alarm'" v-for="item in pointAttributes" :style="item"-->
    <!--@click="pointClick(item.devicecd,item.marginLeft,item.marginTop)" :alt="item.devicecd">-->
  </div>
</template>

<script>
  export default {
    name: "deviceImg",
    props: {
      iconUrl: '',
      iconWarnUrl: '',
      pointAttributes: '',
    },
    data() {
      return {
        attributes: this.pointAttributes
      }
    },
    methods: {
      pointClick(devicecd, x, y) {
        this.$emit('pointClick', devicecd, x, y)
      }
    }
  }
</script>

<style scoped>
  .el-icon-warning {
    font-size: 22px;
  }

  img {
    width: 22px;
    height: 22px;
  }

  .point-val {
    position: absolute;
    width: 50px;
  }
</style>
