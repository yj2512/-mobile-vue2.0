<template>
  <div>
    <nav-bar title="商品展示"></nav-bar>
     <!-- 
       mt-loadmore的坑：
       给mt-loadmore加wrapper，并设置高度，超出高度加overflow: scroll；
       // 若数据已全部获取完毕
       this.allLoaded = true; ，
       bottom-method="loadBottom"不会再触发,
       loadmore 在初始化时会自动检测它的高度是否能够撑满其容器，
       如果不能则会(不断的)调用 bottom-method，直到撑满容器为止(可能会浏览器崩溃)。
       如果不希望使用这一机制，可以将 auto-fill 设为 false。
    -->
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
     <mt-loadmore :autoFill='autoFill' :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"   
      :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="goods-list">
         <li class="goods-item" v-for="goods in goodsList" :key="goods.id">
           <router-link :to="{ name: 'goods.detail', query:{id: goods.id}}">
             <img :src="goods.img_url" alt="">
             <div class="goods-title">{{goods.title}}</div>
             <div class="desc">
               <div class="sale">
                 <span>￥{{goods.market_price}}</span>
                 <span>￥{{goods.sell_price}}</span>
               </div>
               <div class="detail">
                 <div class="hot">热卖中</div>
                 <div class="count">剩{{goods.stock_quantity}}件</div>
               </div>
             </div>
           </router-link>
         </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
      </div>
    </mt-loadmore>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      autoFill: false,
      wrapperHeight: 0,
      topStatus: "",
      isLoadtop: false,
      bottomStatus: "",
      goodsList: [],
      allLoaded: false,
      page: 1
    };
  },
  methods: {
    getGoodsList(page) {
      this.$axios
      .get("getgoods?pageindex=" + page)
      .then(res => {
        console.log(res);
        if (res.data.message.length == 0) {
          this.allLoaded = true;
          return this.$toast('没有更多了')
        }
        if (this.isLoadtop) {
          this.allLoaded = false;
          this.goodsList = [];
          this.page = 1;
          this.isLoadtop = false;
        }
        this.goodsList = this.goodsList.concat( res.data.message );
        this.page++
      })
      .catch(err => {
        console.log(err);
      });
    },
    loadTop() {
      this.isLoadtop = true;
      this.getGoodsList('1');
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange(status) {
      console.log('shang',status);
      this.topStatus = status;
    },
    loadBottom() {
      // 加载更多数据
      console.log('xiala')
      this.getGoodsList(this.page)
      // this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      console.log('xia',status);
      
      this.bottomStatus = status;
    },
    translateChange(translate) {}
    // ...
  },
  created() {
    let page = this.$route.query.page || "1";
     this.getGoodsList(page)
  },
  mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
};
</script>

<style scoped>
.page-loadmore-wrapper {
    overflow: scroll
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.goods-item {
  width: 166px;
  height: 220px;
  border: 1px solid #ccc;
  margin: 4px 8px 8px 8px;
}
.goods-item img {
  width: 166px;
  height: 160px;
}
.goods-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sale span:nth-of-type(1) {
  text-decoration: line-through;
  margin-right: 20px;
}
.sale span:nth-of-type(2) {
  color: red;
}
.detail {
  display: flex;
  justify-content: space-between;
}
.mint-loadmore-top span,
.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}
.mint-loadmore-top span.is-rotate,
.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
</style>

