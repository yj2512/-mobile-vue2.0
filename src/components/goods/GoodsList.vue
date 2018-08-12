<template>
  <div>
    <nav-bar title="商品展示"></nav-bar>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" ref="loadmore">
      <ul>
         <li v-for="(item,index) in list" :key="index">{{ item }}</li>
      </ul>
       <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        topStatus: '',
        list: [1,2,3],
        allLoaded: false
        // ...
      };
    },
    methods: {
      loadTop() {
        console.log('123');
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        // 加载更多数据
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      handleTopChange(status) {
        console.log(status);
        
        this.topStatus = status;
      },
      // ...
    },
    // ...
  }
</script>
