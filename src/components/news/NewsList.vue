<template>
  <div>
    <nav-bar title="新闻列表"></nav-bar>
    <ul>
      <li class="news-item" v-for="(item) in newsList" :key="item.id">
        <router-link :to="{name: 'newsDetail', query: {id: item.id}}">
          <img :src="item.img_url" alt="">
          <div class="news-content">
            <h4>{{item.title}}</h4>
            <p>{{item.zhaiyao}}</p>
            <div>
              <span>点击数：{{item.click}}</span>
              <span>发表时间：{{item.add_time}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
name: 'newsList',
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.$axios
      .get("getnewslist")
      .then(res => {
        console.log(res);
        this.newsList = res.data.message
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style scoped>
  .list-title{
    font-size: 18px;
    line-height: 22px;
    text-align: center
  }
  .news-item a{
    border-bottom: 1px solid #ccc;
    margin-top: 8px;
    padding: 8px;
    display: flex;
    align-items: center
  }
  .news-item img{
    width: 58px;
    height: 58px;
    margin-right: 12px
  }
  .news-content{
    height: 72px
  }
  .news-content h4{
    width: 260px;
    font-size: 14px;
    /* font-weight: bold; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  .news-content p{
    height: 36px;
    display: -webkit-box;    
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 2;    
    overflow: hidden;
  }
</style>
