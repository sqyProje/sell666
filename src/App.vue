<template>
  <!--v-bind:   缩写 ：bind  :dataCont是传递给子页面的props属性值-->
  <div id="app" class="">
    <vueHeader :dataCont="seller"></vueHeader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/Ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <!--缓存所有界面 keep-alive不加 每次切换导航执行一次数据的请求-->
    <keep-alive>
      <router-view :dataCont="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  //传递参数，给后台
  import {urlParse} from './common/js/utils.js'
  import  vueHeader from './components/header/HelloWorld'

  const ERR_Ok=0;

  //父传子方式  将获得的sells传递到HelloWorld中 通过props

  export default {
    name: 'App',
    //生命周期,创建立即执行函数，返回赋值id
    data() {
      return{
        seller:{
          id:(()=>{
            let queryParam = urlParse()
            //解析urlParse 把id传递给seller，seller取到
            return queryParam.id
            //取到以后发送请求的时候，我们需要把api给带上
          })()

        }
      }
    },
    created(){
      this.$http.get('api/seller?id='+this.seller.id+'').then(
        (response) => {
          response =response.body;
          if(response.errno===ERR_Ok){
            //this.seller=response.data;
            this.seller = Object.assign({},this.seller,response.data);
            //相当于用extend方法扩展了seller，把结果赋值给object，返回给this.seller
           // 相当于在id的基础上，给seller添加其他的属性，这样就不会直接把id干掉，给对象添加属性的方法
           // console.log(this.seller.id);
          }
        },
        (error) => {}
        )

    },
    components:{
      vueHeader
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .tab
    display:flex
    width:100%
    height:40px;
    line-height 40px;
     //一像素的边框设置，直接border-top：一像素在iphone会显示两像素，通过stylus函数伪类设置 mixin.styl
    //伪类和缩放的比例base.styl
    border-1px(rgba(7,17,27,0.1));
    .tab-item
       flex: 1
       text-align:center
       & > a
          display block
          font-size 14px;
          color:rgb(77,85,93)
          &.active.Exact-active
            color:rgb(240,20,20)
</style>
