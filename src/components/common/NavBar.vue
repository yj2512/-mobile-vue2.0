<template>
  <div class="page-header">
    <h1 class="goback" @click="goBack">&nbsp;&lt;</h1>
    <h1 class="page-title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['title'],
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.page-header{
  height: 40px;
  line-height: 40px;
  background-color: #f7f7f7;
  position: relative;
  text-align: center;
  font-size: 18px
}
.goback{
  position: absolute;
  left: 26px;
}
</style>


