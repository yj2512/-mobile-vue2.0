<template>
  <div>
    <nav-bar title="图文列表"></nav-bar>
    <ul class="title-list">
      <li @click="getPhotoListById(title.id)" v-for="title in titleList" :key="title.id">{{title.title}}</li>
    </ul>
    <ul class="photo-list">
      <li v-for="item in photoList" :key="item.id">
        <router-link :to="{ name: 'photo.detail', query: {id: item.id, page:1}}">
          <img v-lazy="item.img_url" :alt="item.seo_keywords">
          <div class="photo-info">
            <h4>{{item.title}}</h4>
            <p>{{item.zhaiyao}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'photoList',
  data() {
    return {
      titleList: [],
      photoList: []
    }
  },
  methods: {
    getPhotoListById(categoryId) {
      this.$router.push({
        name: 'photoList',
        params: {categoryId: categoryId}
      })
      
    },
    loadPhotoList(id) {
      this.$axios.get('getimages/' + id).then(res=>{
        this.photoList = res.data.message;
        if (this.photoList.length == 0 ) {
          console.log('没有图' )
          this.$toast({
            message: '没有数据~',
            iconClass: 'iconfont icon-meiyoudingdan-01',
             duration: 3000
          });
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
   beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    let categoryId = to.params.categoryId;
    this.loadPhotoList(categoryId);
    next()
  },
  created() {
    let categoryId = this.$route.params.categoryId;
    this.loadPhotoList(categoryId);

    //获取标题列表
    this.$axios.get('getimgcategory').then(res=>{
      console.log(res)
      this.titleList = res.data.message;
      this.titleList.unshift({
        id: 0,
        title: '全部'
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.title-list{
  overflow: auto;
  white-space: nowrap;
  margin-bottom: 10px
}
.title-list li{
  display: inline-block;
  font-size: 14px;
  line-height: 36px;
  color: lightseagreen;
  margin: 0 16px;
}
.photo-list li{
  position: relative;
  margin-bottom: 16px
}
.photo-list img{
  width: 100%;
  height: 260px;
}
.photo-info{
  position: absolute;
  bottom: 12px;
  color: lightcyan
}
</style>
