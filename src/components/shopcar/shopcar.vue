<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <img :src="totalCount>0 ? lightcartlogo : cartlogo" width="30" height="30" alt="">
            </div>
            <!--选中数量-->
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}} 元</div>
        </div>
        <div class="content-right"  @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
        <div class="ball-container">
          <div v-for="ball in balls">
            <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
              <div class="ball"  v-show="ball.show" >
                <div class="inner inner-hook">
                </div>
              </div>
            </transition>
          </div>
        </div>
        <transition name="fade">
          <div class="shopcart-list"  v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listcontent">
              <ul>
                <li class="food" v-for="food in selectFoods">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.count*food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartControl @cart-add="drop" :food="food"></cartControl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>

    </div>
    <transition name="fade">
      <!-- listShow表示当list详情列表显示的时候mask才显示 -->
      <div class="list-mask" v-show="listShow" @click="hideList()"></div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import  carlogo from '../../../static/img/cart@2x.png'
  import  lightcart from '../../../static/img/lightcart.png'
  import BScroll from 'better-scroll'
  import cartControl from '../cartcontrol/cartcontrol.vue'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        cartlogo: carlogo,
        lightcartlogo: lightcart,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold:true //折叠
      }
    },
    computed: {
      //总价
      totalPrice () {
        let total = 0
        /*console.log(this.selectFoods)*/
        this.selectFoods.forEach((food) => {
          total += food.count * food.price
        })
        return total
      },
      //数量
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      //支付差值金额状态
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return `去结算`
        }
      },
      //支付差值颜色状态
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return `not-enough`
        } else {
          return `enough`
        }
      },
      //购物车列表显示隐藏
      listShow() {
        if(!this.totalCount){
          this.fold = true
          return false
        }
        // 有商品的时候以变量show做状态切换
        // fold为true(折叠)则show为false(折叠)，fold为false(展开)，则show为true(展开);
        // 这样，show就跟v-show的true和false状态同步了，变为true时展开，false时折叠
        let show = !this.fold
        if(show){
          this.$nextTick(() => {
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.listcontent,{
                click:true
              })
            }else{
              this.scroll.refresh()
            }
          })
        }
        return show
      }
      },
    methods: {
      drop (el) {
      /*  console.log(el)*/
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter (el) {
        /*console.log(el);*/
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22 )
            el.style.display = ''
            el.style.webkitTransform = `translated3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0, 0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vals*/
        let rf = el.offsetHeight;
        this.$nextTick(()=>{
        el.style.webkitTransform = 'translated3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0, 0)'
        inner.style.transform = 'translate3d(0,0,0)'
        })

      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false
          el.style.display = 'none';
        }

      },
      //来回折叠
      toggleList() {
        if(!this.totalCount){
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) =>{
          food.count = 0
        })
      },
      hideList() {
        this.fold = true; //点击mark层，购物车详情列表被收回
      },
      pay() {
        if(this.totalPrice < this.minPrice){
          return
        }
        window.alert(`支付${this.totalPrice}元`)

      }

    },
    components:{
      cartControl
    },
  }

</script>
<style scope lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position:fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height:48px
    .content
      display:flex
      background: #141d27
      font-size: 0
      color:rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display:inline-block
          position:relative
          top: -10px
          margin:0 12px
          padding: 6px
          width:56px
          height:56px
          box-sizing:border-box
          vertical-align:top
          border-radius: 50%
          background: #141d27
          .logo
            width:100%
            height: 100%
            background:#2b343c
            border-radius 50%
            &.highlight
              background :rgb(0,160,220)
            img
              margin: 6px
          .num
            position:absolute
            top: 0
            right: 0
            width:24px
            height: 16px
            line-height:16px;
            text-align:center
            font-size:12px;
            background:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgb(0,0,0,.4)
            color :#fff
            font-weight: 700
            border-radius: 8px
        .price,.desc
          display:inline-block
          margin-top:12px
          line-height 24px
        .price
          padding-right:12px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight :700
          &.highlight
            color :#fff
        .desc
          padding-left:12px
          box-sizing:border-box
          font-size:10px
      .content-right
        flex:0 0 105px
        .pay
          height:48px
          line-height:48px
          font-size:12px;
          background:#2b343c
          font-weight 700
          text-align:center
          &.not-enough
            background :#2b333;
          &.enough
            background :#00b43c
            color:#fff
      .ball-container
        .ball
          position:fixed
          left: 32px
          bottom: 22px
          z-index: 200
          &.drop-enter-active
            transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
          .inner
            width: 16px
            height: 16px
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
            background:rgb(0,160,220)
            transition: all 0.4s linear
      .shopcart-list
        position:absolute
        top: 0
        left:0
        z-index: -1
        width: 100%
        transform translate3d(0, -100%, 0) //整个列表相对于当前自身的高度做一个偏移
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.5s linear
          transform translate3d(0, -100%, 0) //每个表项相对于当前自身的高度做一个偏移
        &.fade-enter, &.fade-leave-active
          transform translate3d(0, 0, 0)
        .list-header
          height:40px;
          line-height: 40px
          padding:0 18px
          background #f3f5f7
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .title
            float:left
            font-size:14px
            color:rgb(7,17,27)
          .empty
            float:right
            font-size:12px
            color:rgb(0,160,220)

        .list-content
          padding: 0 18px
          max-height: 217px
          background: #ffffff
          overflow:hidden
          .food
            position:relative
            padding:12px 0
            box-sizing :border-box
            border-1px(rgba(7,17,27,0.1))
            .name
              line-height:24px
              font-size:12px;
              color:rgb(7,17,27)
            .price
              position:absolute
              right:90px;
              bottom:18px
              line-height: 12px
              font-size: 14px
              font-weight: 700
              color:rgb(240,20,20)
            .cartcontrol-wrapper
              position:absolute
              right:0
              bottom:14px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40 //z-index要小于shopcart的index
    backdrop-filter blur(10px) // 模糊效果
    -webkit-backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      opacity 1
      transition: all 0.5s //设置缓动效果
      background rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave-active
      opacity 0
      background rgba(7, 17, 27, 0)

</style>
