<template>
  <div>
    <nav-bar title="新闻详情"></nav-bar>
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


