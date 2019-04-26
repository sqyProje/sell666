<template>
  <transition name="slide">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide"> < </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name="fade">
            <div class="buy"  @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info"  v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @ratingtype_select="ratingTypeSelect" @content_toggle="contentToggle" :selectType="selectType"
                        :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                </div>
                <formatDate :ratingTime="rating"></formatDate>
                <p class="text">
                  <img  width="12" height="12" :src="rating.rateType === 0 ? praise : notpraise" />
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>


        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  //父组件可以调用子组件的方法 ，子组件不可以调用父组件的方法 show()被goods组件调用
  //<food :food="selectedFood" ref=food></food>
  //引用时：this.$refs.show
  import BScroll from 'better-scroll'
  import Vue from "vue"
  import praise from "../../../static/img/praise.png"
  import notpraise from "../../../static/img/notpraise.png"

  import cartControl from '../cartcontrol/cartcontrol.vue'
  import ratingselect from "../ratingselect/ratingselect.vue"
  import split from "../split/split.vue"
  import formatDate from '../formatdate/formatdate.vue'


  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

 export default{
   props: {
     food:{
       type:Object
     }
   },
   data() {
     return{
       praise:praise,
       notpraise:notpraise,
       showFlag:false,
       /*定义变量跟踪评价*/
       selectType:ALL,
       onlyContent:true,
       desc: {
         all:"全部",
         positive:"推荐",
         negative:"吐槽"
       }
     }
   },
   methods:{
     show() {
       this.showFlag = true
       this.selectType = ALL
       this.onlyContent = true
       //内容滚动
       this.$nextTick(()=>{
         if(!this.scroll){
           this.scroll = new BScroll(this.$refs.food,{
             click:true
           })
         }else{
           this.scroll.refresh();
         }
       })
     },
     hide() {
       this.showFlag = false
     },
     addFirst(event) {
       if(!event._constructed){
         return
       }
      /* console.log(event.target);*/
       this.$emit('cart-add',event.target);
       Vue.set(this.food,"count",1)
     },
     //设置rate类型
     ratingTypeSelect(type) {
       this.selectType = type
       this.$nextTick(()=>{
         this.scroll.refresh()
       })
     },
     //toggle
     contentToggle(){
       this.onlyContent = !this.onlyContent
       this.$nextTick(()=>{
         this.scroll.refresh()
       })
     },
     // 是否只展示是否有内容的
     needShow(type,text) {
       if(this.onlyContent && !text){
         return false
       }else if(this.selectType === ALL){
         return true
       }else{
         return type === this.selectType
       }
     }
   },
   components:{
     cartControl,
     ratingselect,
     split,
     formatDate
   }
 }

</script>


<style scope lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .slide-enter-active
    transition: all .3s linear;
    transform: translate(0,0,0);
  .slide-leave-active
    transition: all .3s linear;
    transform: translate3d(0,0,0);
  .slide-enter, .slide-leave-to /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translate3d(100%,100%,0);
  .food
    position:fixed
    left:0
    top:0
    bottom:48px
    background:#ffffff
    z-index:30
    width: 100%
    .image-header
      width: 100%
      padding-top: 100%
      position:relative
      height: 0
      img
       position:absolute
       top:0
       left: 0
       width:100%
       height:100%
      .back
        position:absolute
        top: 10px
        left:0
        color:#fff
        padding :10px
        font-size:24px


    .content
      padding:18px;
      position:relative
      .title
        font-size:14px;
        font-weight: 700
        color:rgb(7,17,27)
        line-height:14px;
        margin-bottom:8px;
      .detail
        font-size:0
        color:rgb(147,153,159)
        height:10px
        margin-bottom:18px;
        .sell-count,.rating
          font-size:10px;
          line-height:10px;
        .sell-count
          margin-right:12px;
      .price
        font-weight: 700
        line-height: 24px
        .new
          margin-right: 8px
          font-size:14px
          color:rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size :10px
          color:rgb(147,153,159)


      .cartcontrol-wrapper
        position:absolute
        right:18px;
        bottom:18px;
      .buy
        position:absolute
        right:18px;
        bottom:18px;
        font-size:10px;
        color:rgb(255,255,255);
        line-height:24px;
        background:rgb(0,160,220)
        border-radius:24px
        padding:0 12px;
        box-sizing:border-box
        &.fade-enter-active,.fade-leave-active
          transition: all .3s linear;
          opacity:1
        &.fade-enter, .fade-leave-active /* .slide-fade-leave-active for below version 2.1.8 */
          opacity:0

    .info
      padding:18px;
      .title
        line-height:14px
        margin-bottom:6px
        font-size: 14px
        color:rgb(7,17,27)
      .text
        line-height:24px;
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
    .rating
      padding-top: 18px
      .title
        line-height:14px
        margin-left:18px
        font-size: 14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position:relative
          padding: 16px 0
          border-1px(rgba(7,17,27,.1))
          .user
            position:absolute
            right: 0
            top:16px
            font-size :0
            line-height:12px
            color:rgb(147,153,159)
            .name
             display :inline-block
             vertival-align:top
             margin-right:6px
             font-size: 10px
            .avatar
              border-radius:50%


          .time
            font-size:10px
            color:rgb(147,153,159)
            line-height: 12px
            margin-bottom:6px;

          .text
            line-height:16px;
            font-size:10px
            color:rgb(7,17,27)
            img
              margin-right:4px
              vertical-align:middle

        .no-rating
          padding:16px 0
          font-size:12px
          text-align:center
          color:rgb(147,153,159)

</style>
