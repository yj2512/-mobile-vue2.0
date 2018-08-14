import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index/Index'
import VIP from '@/components/vip/VIP'
import ShopCart from '@/components/shopcart/ShopCart'
import Search from '@/components/search/Search'

import NewsList from '@/components/news/NewsList'
import NewsDetail from '@/components/news/NewsDetail'

import PhotoList from '@/components/photo/PhotoList'
import PhotoDetail from '@/components/photo/PhotoDetail'

import GoodsList from '@/components/goods/GoodsList'
import GoodsDetail from '@/components/goods/GoodsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //重定向操作
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/vip',
      name: 'vip',
      component: VIP
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/news/list',
      name: 'newsList',
      component: NewsList
    },
    {
      path: '/news/deail',
      name: 'newsDetail',
      component: NewsDetail
    },
    {
      path: '/photo/list/:categoryId',
      name: 'photoList',
      component: PhotoList
    },
    {
      path: '/photo/detail',
      name: 'photo.detail',
      component: PhotoDetail
    },
    {
      path: '/goods/list',
      name: 'goods.list',
      component: GoodsList
    },
    {
      path: '/goods/detail',
      name: 'goods.detail',
      component: GoodsDetail
    },
    // 商品详情的图文介绍
    {
      path: '/goods/photo/info',
      name: 'photo.info',
      component: NewsDetail
    }
  ]
})
