<template>
  <div>
    <nav-bar :title="title"></nav-bar>
    <div>
      <h3 class="detail-title">{{newsDetail.title}}</h3>
      <div>
        <span>点击数：{{newsDetail.click}}</span>
        <span>添加时间：{{newsDetail.add_time}}</span>
      </div>
    </div>
    <div class="newsDetail-centent" v-html="newsDetail.content"></div>
  </div>
</template>

<script>
export default {
  name: 'newsDetail',
  data() {
    return {
      title: '',
      newsDetail: {}
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$axios.get('getnew/' + id).then(res => {
      console.log(res)
      this.newsDetail = res.data.message[0]
    }).catch( err =>{
      console.log(err)
    })
  },
  beforeRouteEnter (to, from, next) {   // 在渲染该组件的对应路由被 confirm 前调用
    console.log(to);
     console.log(from);
     let title = '';
     // from.name 为空，说明是粘贴地址栏过来的
     // 
     if (from.name === null) {
       if (to.name === 'newsDetail') {
         title = '新闻详情'
       }else if (to.name === 'photo.info') {
         title = '商品图文介绍'
       }
     }else if( from.name == 'newsList'){
       title = '新闻详情'
     }else if (from.name == 'goods.detail') {
       title = '商品图文介绍'
     }

    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.title = title   //vm 是未来组件的this
    })
}
}
</script>

<style scoped>
  .detail-title{
    font-size: 14px;
    line-height: 36px;
    text-align: center;
    color: lightseagreen
  }
  .newsDetail-centent{
    padding: 0 10px
  }
</style>


