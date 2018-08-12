<template>
	<div>
	<mt-swipe :auto="4000">
		<mt-swipe-item v-for="(item,index) in swipeImg" :key='index'>
      <img class="swipe-img" :src="item.img" alt="">
    </mt-swipe-item>
	</mt-swipe>
  <ul class="grid">
    <li v-for="(item,index) in list" :key="index">
      <router-link :to="item.router">
        <img :src="item.img" alt="">
        <div>{{item.text}}</div>
      </router-link>
    </li>
  </ul>
	</div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      swipeImg: [],
      list: [
        {
          img: require("@/assets/news.png"),
          text: "新闻资讯",
          router: { name: "newsList" }
        },
        {
          img: require("@/assets/share.png"),
          text: "图文分享",
          router: { name: "photoList", params: { categoryId: 0} }
        },
        {
          img: require("@/assets/news.png"),
          text: "商品展示",
          router: { name: "goods.list" }
        },
        {
          img: require("@/assets/share.png"),
          text: "图文分享",
          router: { name: "newsList" }
        },
        {
          img: require("@/assets/news.png"),
          text: "新闻资讯",
          router: { name: "newsList" }
        },
        {
          img: require("@/assets/share.png"),
          text: "图文分享",
          router: { name: "newsList" }
        }
      ]
    };
  },
  created() {
    this.$axios
      .get("getlunbo")
      .then(res => {
        this.swipeImg = res.data.message;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.mint-swipe {
  height: 200px;
}
.swipe-img {
  width: 100%;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
}
.grid li {
  margin-top: 12px;
  width: 120px;
  font-size: 16px;
}
.grid img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
</style>


