<template>
  <div>
    <nav-bar title="商品详情"></nav-bar>
    <mt-swipe :auto="4000">
		  <mt-swipe-item v-for="(item,index) in swipeImg" :key='index'>
        <img class="swipe-img" :src="item.src" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="goods-info">
      <h4>{{goods.title}}</h4>
      <div>
        <span>￥{{goods.market_price}}</span>
        <span>￥{{goods.sell_price}}</span>
        <span>库存：{{goods.stock_quantity}}</span>
      </div>
      <div class="buy-num">
        <span>-</span>
        <input type="text" v-model="goodsNum">
        <span>+</span><br/>
      </div>
      <mt-button type="primary" size='normal'>立即购买</mt-button>
      <mt-button type="danger" size='normal'>加入购物车</mt-button>
    </div>
    <my-comment :cid='$route.query.id'></my-comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swipeImg: [],
      goods: {},
      goodsNum: 1
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$axios.get('getthumimages/' + id).then(res=>{
      this.swipeImg = res.data.message;
    }).catch(err=>{
      console.log(err)
    })
    this.$axios.get('goods/getinfo/' + id).then(res=>{
      console.log(res)
      this.goods = res.data.message[0];
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mint-swipe {
  height: 376px;
}
.swipe-img {
  width: 100%;
}
.goods-info{
  margin: 0 12px 
}
.buy-num{
  margin: 4px
}
.buy-num input{
  margin: 2px;
  height: 26px;
  width: 60px
}
.buy-num span{
  line-height: 26px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  margin-right: 4px
}
</style>


