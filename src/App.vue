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
        <mt-badge type="error" size="small" v-show="shopcartNum">{{shopcartNum}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click="changeHash" slot="icon" src="./assets/icons/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>


<script>
import EventBus from './EventBus.js';
export default {
  data() {
    return {
      selected: "",
      shopcartNum: 0,
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
  },
  created(){
    EventBus.$on('addShopCart', data=>{
      this.shopcartNum += data
    })
  }
};
</script>

<style>
.mint-tab-item{
  position: relative;
}
.mint-tab-item .mint-badge{
  position: absolute;
  right: 6px;
  top: 6px
}
</style>
