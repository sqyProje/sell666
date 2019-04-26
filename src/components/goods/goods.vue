<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuwrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex === index}"
          @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <classMsg v-show="item.type > 0" :classMsgType="item.type"></classMsg>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodswrapper">
        <ul>
          <!--food-list-hook被选择，并没有实际样式-->
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods">
                <div class="icon"><img :src="food.icon" width="57" height="57" alt=""></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCont}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new">￥{{food.price}}</span><span class="old"v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--接收emit方法-->
                    <cartControl  v-on:cart-add="drop" :food="food"></cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--v-ref父组件访问子组件方法 获取整个组件对象-->
      <shopCart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="dataCont.deliveryPrice" :minPrice="dataCont.minPrice"></shopCart>
    </div>
    <!--隐藏的详情页-->
    <foodeatil :food="selectedFood" ref="food"></foodeatil>
  </div>
</template>

<script type="text/ecmascript-6">
  //特 惠等字体组件
  import BScroll from 'better-scroll'
  import classMsg from '../classMsg/classMsg.vue'
  import shopCart from '../shopcar/shopcar.vue'
  import cartControl from '../cartcontrol/cartcontrol.vue'
  import foodeatil from '../fooddetail/foodeatil.vue'
  const  ERR_Ok=0

  export default {
    props:{
      dataCont:{
        type:Object
      }
    },
    data() {
      return {
        goods:[],
        listHeight:[],
        scrollY:0, //跟踪变量,
        selectedFood:{}
      }
    },
    //计算属性
    computed:{
      //当前索引
      currentIndex() {
        for (let i=0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
            return i
          }
        }
        return 0
      },
      //计算选中的的food 与购物车底部关联
      selectFoods() {
        let foods=[]
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      //定义个数组进行控制类名的切换减 惠
      this.ClassMsg=["decrease","discount","special","invoice","guarantee"]
      this.$http.get('api/goods').then((response)=>{
        response = response.body
        if(ERR_Ok == 0){
          this.goods = response.data
          //$nextTick数据dom更新之后计算
          this.$nextTick(()=>{
            this._initScroll();
            this._calculatelHeight();
          })
        }
      }).then(error=>{
        //alert("暂无数据")
      })
    },
    methods:{
      //点击选中菜单
      selectMenu(index,event) {
        //解决pc上点击出现两三次
        if(!event._constructed){
          return ;
        }
        let foodList3 = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let  el = foodList3[index]
        this.foodsScroll.scrollToElement(el,300)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuwrapper,{
          click:true//默认派发点击 pc=端出现两次点击事件解决办法$event
        });
        this.foodsScroll = new BScroll(this.$refs.foodswrapper,{
          //1 滚动的时候会派发 scroll 事件，会截流。
          // 2滚动的时候实时派发 scroll 事件，不会截流。
          // 3除了实时派发 scroll 事件，在 swipe 的情况下仍然能实时派发 scroll 事件
          click:true,
          probeType:3
        });
        this.foodsScroll.on('scroll',(pos)=>{
          //round四舍五入 abs取绝对值
          this.scrollY=Math.abs(Math.round(pos.y))
        })
      },
      //计算每一项的高度
      _calculatelHeight() {
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for(let i=0;i<foodList.length;i++){
          let item = foodList[i]
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      },
      //商品详情
      selectFood(food,event) {
        if(!event._constructed){
          return ;
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      //加入购物车时动画
      drop(target) {
        this.$nextTick(()=>{
          this.$refs.shopCart.drop(target)
        })
      }
    },
    components:{
      classMsg,
      shopCart,
      cartControl,
      foodeatil
    },
    //自定义事件
    events: {
      //调用子组件的方法
      'cart.add'(target) {
        this._drop(target)
      }
  }

  }

</script>


<style scope lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display:flex
    position:absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px
      width:80px;
      background: #f3f5f7
      //overflow :auto
      .menu-item
        display: table //垂直居中最好方式
        height:54px
        width:56px
        line-height:14px
        padding : 0 12px;
        &.current
          position:relative
          z-index: 10
          margin-top:-1px
          background: #ffffff
          font-weight: 700
          .text
            border:none
        .icon
          display:inline-block
          width: 12px
          height:12px
          background-size:12px 12px
          background-repeat :no-repeat
          margin-right:2px
        .text
          display:table-cell
          width:56px;
          font-size:12px;
          vertical-align middle
          border-1px(rgba(0,0,0,0.1))

    .foods-wrapper
      flex:1
       //overflow :auto
      .title
        padding-left: 14px
        height:26px
        line-height: 26px
        border-left:2px solid #d9dde1
        font-size: 12px
        color:rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display:flex
        margin: 18px
        padding-bottom:18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-1px-no()
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right:10px
        .content
          flex: 1
          .name
            margin:2px 0 8px 0pgx
            line-height:14px
            height:14px
            font-size: 14px
            color:rgb(7,17,27)
          .desc,.extra
            line-height:10px
            font-size :12px
            color:rgb(147,153,159)
          .desc
            margin-top:8px
            margin-bottom: 8px
            line-height:12px
          .extra
            .count
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
            position: absolute
            right: 0
            bottom: 8px
            z-index:100


</style>
