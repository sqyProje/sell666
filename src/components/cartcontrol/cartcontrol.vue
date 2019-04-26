<template>
  <div class="cartcontrol">
    <transition name="slide-fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <img :src="decrease" alt="" width="14" height="16">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add"  @click.stop.prevent="addCart($event)">
      <img :src="add"  alt=""  width="16" height="16">
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import add from '../../../static/img/add.png'
  import decrease from '../../../static/img/decrease.png'
  import  Vue from  'vue'
  export default{
    props:{
      food:{
        type:Object
      }
    },
    data() {
      return{
        add:add,
        decrease:decrease
      }
    },
    methods:{
      addCart(event) {
        //解决pc上点击出现两三次
        //count为原先不存在的数据，重新添加的数据的需要重新检测 vue.set() 返回设置的值
        if(!event._constructed){
          return ;
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1)
          //this.food.count = 1
        }else{
          this.food.count++
        }
        //添加购物车的时派发事件，$emit('cart.add',event.target)
        //goods组件接收事件
        this.$emit('cart-add',event.target);
      },
      decreaseCart(event) {
        if(!event._constructed){
          return ;
        }
        if(this.food.count){
          this.food.count--
        }
      }

    }
  }

</script>
<style scope lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
    .cart-decrease,.cart-add
      display:inline-block
      width:20px
      height:20px
      background: #117dbf
      text-align: center
      line-height: 20px
      font-size: 20px
      color :rgb(255,255,255)
      border-radius:50%
    .cart-decrease
      background:none
      border:2px solid #117dbf
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      color:#117dbf
      vertical-align: bottom
      //transition:all 0.4s linear
      /* 可以设置不同的进入和离开动画 */
      /* 设置持续时间和动画函数 */
    .cart-count
      display:inline-block
      vertical-align: top
      width: 12px
      padding:0 6px
      line-height: 20px
      font-size: 10px
      text-align:center
      color:rgb(147,153,159)
    .cart-add
      display:inline-block
</style>
