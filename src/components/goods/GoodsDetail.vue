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
        <span @click="subtract">-</span>
        <input type="text" v-model="pickNum">
        <span @click="add">+</span>
      </div>
      <div class="buy-action">
        <transition name="bounce" v-on:after-enter="afterEnter">
          <div class="red-ball" v-if="isJoinCart">{{pickNum}}</div>
        </transition>
        <mt-button type="primary" size='normal'>立即购买</mt-button>
        <mt-button @click="joinShopCart" type="danger" size='normal'>加入购物车</mt-button>
      </div>
    </div>
    <mt-button class="photo-info" @click="toPhotoInfo" type="primary" size='large' plain>图文介绍</mt-button>
    <div class="goods-comment">商品评论</div>
    <br/>
    <my-comment :cid='$route.query.id'></my-comment>
  </div>
</template>

<script>
import EventBus from '@/EventBus';
export default {
  data() {
    return {
      swipeImg: [],
      goods: {},
      pickNum: 1,
      isJoinCart: false
    };
  },
  methods: {
    add() {
      if (this.pickNum >= this.goods.stock_quantity) return;

      this.pickNum++;
    },
    subtract() {
      if (this.pickNum <= 1) return;
      this.pickNum--;
    },
    joinShopCart() {
      this.isJoinCart = true;
    },
    afterEnter: function(el) {
      this.isJoinCart = false;
      EventBus.$emit('addShopCart',this.pickNum)
    },
    toPhotoInfo(){
      this.$router.push({
        name: 'photo.info',
        query: {
          id: this.$route.query.id
        }
      })
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$axios
      .get("getthumimages/" + id)
      .then(res => {
        this.swipeImg = res.data.message;
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .get("goods/getinfo/" + id)
      .then(res => {
        console.log(res);
        this.goods = res.data.message[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch:{
    pickNum(newV, oldV){
      if (newV >= this.goods.stock_quantity) {
        this.pickNum = this.goods.stock_quantity
      }
    }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 376px;
}
.swipe-img {
  width: 100%;
}
.goods-info {
  margin: 0 12px;
}
.buy-num {
  margin: 4px;
}
.buy-num input {
  margin: 2px;
  height: 26px;
  width: 60px;
}
.buy-num span {
  line-height: 26px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  margin-right: 4px;
}
.buy-action {
  position: relative;
}
.buy-action .red-ball {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  left: 86px;
  top: -16px;
  z-index: 6;
  text-align: center;
  color: white;
  line-height: 32px;
}
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave {
  opacity: 0;
}
/* .bounce-leave-active {
  animation: bounce-in .5s reverse;
} */
@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(150px, -50px, 0);
  }
  75% {
    transform: translate3d(200px, 30px, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}
.goods-comment{
  font-size: 16px;
  margin-bottom: 10px
}
.photo-info{
  width: 90%;
  margin: 12px auto
}
</style>


