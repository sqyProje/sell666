import Vue from 'vue'
//路由
import Router from 'vue-router'
// ajax
import VueResouce from 'vue-resource'
//  @ 的配置是在webpack.base.conf.js中配置
import Goods from '@/components/goods/goods.vue'
import Ratings from '@/components/ratings/ratings.vue'
import Sells from '@/components/seller/seller.vue'
//全局引用styl样式
import  "@/common/stylus/index.styl"

Vue.use(Router)
Vue.use(VueResouce)

export default new Router({
  mode:'history',//去除#号
  linkActiveClass:'active',//配置选中项的默认类名进行修改
  linkExactActiveClass:"Exact-active",//配置选中项
  routes: [
    {
      path: '/',
      name: 'Goods',
      component:Goods
    },
    {
      path: '/Ratings',
      name: 'Ratings',
      component:Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component:Sells
    }
  ]
})
