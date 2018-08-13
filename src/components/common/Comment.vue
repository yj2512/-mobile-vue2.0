<template>
  <div class="comment-tem">
    <textarea name="" id="" cols="30" rows="10" v-model="newComment"></textarea>
    <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
    <ul class="comment-list">
      <h5>评论列表（{{commentNum}}）</h5>
      <li v-for="comment in commentList" :key="comment.id">
        <div>{{comment.user_name}}：</div>
        <div>{{comment.content}}</div>
        <div>{{comment.add_time}}</div>
      </li>
    </ul>
    <mt-button type="danger" size="large" plain @click="loadMore" v-show="showmore">加载更多（{{page}}）</mt-button>
  </div>
</template>

<script>
export default {
  name: "my-comment",
  props: ["cid"],
  data() {
    return {
      newComment: "",
      commentList: [],
      commentNum: 0,
      page: 1,
      showmore: true
    };
  },
  methods: {
    firstLoad() {
      this.$axios
        .get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          console.log(res);
          if (res.data.message.length == 0) {
            this.$toast("没有数据了");
            this.showmore = false;
          }
          this.commentList = res.data.message;
          this.commentNum = this.commentList.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMore() {
      this.$axios
        .get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          console.log(res);
          if (res.data.message.length == 0) {
            this.$toast("没有数据了");
            this.showmore = false;
          }
          this.commentList = this.commentList.concat(res.data.message);
          this.commentNum = this.commentList.length;
          this.page++;
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendMsg() {
      if (this.newComment === '') {
        return this.$toast('评论信息不能为空')
      }
      this.$axios
        .post("postcomment/" + this.cid, "content=" + this.newComment)
        .then(res => {
          console.log(res);
          this.newComment = '';
          this.page = 1;
          this.firstLoad()
        })
        .catch(err => {});
    }
  },
  created() {
    this.page = this.$route.query.page || "1";
    this.firstLoad();
  }
};
</script>
  
<style scoped>
.comment-tem{
  padding-top: 10px
}
textarea {
  width: 90%;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  display: block;
}
</style>

