<template>
  <div>
    <nav-bar title="图文详情"></nav-bar>
    <h2 class="detail-title">{{detail.title}}</h2>
    <div>
      <span>点击数：{{detail.click}}</span>
      <span>发表时间：{{detail.add_time}}</span>
    </div>
    <!-- 图片预览插件 -->
     <vue-preview :slides="imgs"></vue-preview>
    <!-- <ul class="imgs-list clearfix">
      <li v-for="item in imgs" :key="item.id">
        <img :src="item.src" alt="">
      </li>
    </ul> -->
    <div class="photoDetail-content" v-html="detail.content"></div>

    <my-comment :cid='$route.query.id'></my-comment>
  </div>
</template>

<script>
export default {
  // name: 'photo.detail', //这里的命名不能带.,报错
  data() {
    return {
      detail: {},
      imgs: []
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$axios.get('getimageinfo/' + id).then(res=>{
      this.detail = res.data.message[0]
    }).catch(err=>{
      console.log(err)
    })

    this.$axios.get('getthumimages/' + id).then(res=>{
      this.imgs = res.data.message;
      this.imgs.forEach(img=>{
        img.msrc = img.src;
        img.w = 600;
        img.h = 400;
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.detail-title{
  font-size: 16px;
  line-height: 36px;
  color: lightseagreen;
  text-align: center
}
.my-gallery img{
  width: 80px;
  height: 80px;
}
.photoDetail-content{
  padding: 0 10px
}
</style>
