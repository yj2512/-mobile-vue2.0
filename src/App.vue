<template>
  <div>
    <mt-header title="我们的信息管理系统"></mt-header>
    <router-view class="view-content"></router-view>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="index">
        <img @click="changeHash" slot="icon" src="./assets/icons/index.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="vip">
        <img @click="changeHash" slot="icon" src="./assets/icons/vip.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img @click="changeHash" slot="icon" src="./assets/icons/shopcart.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click="changeHash" slot="icon" src="./assets/icons/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      selected: ""
    };
  },
  methods:{
    changeHash() {
      this.$nextTick(function () {
         this.$router.push({
          name: this.selected
        });
      })
    }
  },
  watch: {
    // selected(newV, oldV) {
      // this.$router.push({
      //   name: newV
      // });
    // }
  }
};
</script>

<style>

</style>
