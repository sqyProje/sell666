<template>
  <div class="seller" ref="sellerwrapper">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{dataCont.name}}</div>
        <div class="desc border-1px">
          <star :starSize="36" :starScore="dataCont.score"></star>
          <span class="text">（{{dataCont.ratingCount}}）</span>
          <span class="text">月售{{dataCont.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{dataCont.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{dataCont.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{dataCont.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <!--收藏按钮-->
        <div class="favorite" @click="toggleFavarite">
          <span class="img-wrapper">
            <img :src="favorite === true ? collection :notcollection" alt="" width="24" height="24">
          </span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <div class="content">{{dataCont.bulletin}}</div>
        </div>
        <ul class="supports" v-if="dataCont.supports">
          <li class="supports-item border-1px" v-for="(v ,i) in dataCont.supports">
            <classMsg :classMsgType="dataCont.supports[i].type" > </classMsg>
            <!-- <span class="icon" :class="ClassMsg[dataCont.supports[i].type]"></span>-->
            <span class="text">{{dataCont.supports[i].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pic">
        <h1 class="title">商家信息</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in dataCont.pics">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in dataCont.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import{saveTolocal, loadFormLocal} from '../../common/js/store'
  import collection from '../../../static/img/collection.png'
  import notcollection from '../../../static/img/notcollection.png'
  import star from '../../components/start/start.vue'
  import split from '../../components/split/split.vue'
  import classMsg from "../../components/classMsg/classMsg.vue"
export default {
  name:'Sells',
  props:{
    dataCont:{
      type:Object
    }
  },
  data(){
    return{
      collection:collection,
      notcollection:notcollection,
      favorite:(()=>{
        return loadFormLocal(this.dataCont.id,'favorite',false)
      })()
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  //当页面渲染完成之后执行 ready() {}是vue1 vue2中使用mounted
  /*vue1 方法
  {
    // this.scroll = new BScroll(this.$refs.sellerwrapper, {click: true});写成一个方法
  //此时 dataCont 是异步请求，只有ready执行 但是并没有获取dataCont,所以无法滑动，这时使用watch,监听数据的
  //变化，当数据变化时才会执行，但当菜单来回切换时，出现不能滚动（显示隐藏数据没有变化）
  watch: {
    'dataCont'(){
      alert(1)
     this._initScroll()
    }
  },
  }*/
  // vue2 方法 先执行mounted,之后watch
  watch: {
    'dataCont'(){
      this.$nextTick(() => {
       // alert(1)
        this._initScroll()
        this._initPicScroll()
      })
    }
  },
  mounted() {
    //alert(2)
    this.$nextTick(() => {
      this._initScroll()
      this._initPicScroll()
    })


  },
  methods: {
    toggleFavarite(event){
      if(!event._constructed){
        return
      }
      this.favorite =!this.favorite
      saveTolocal(this.dataCont.id,'favorite',this.favorite)

    },
    _initScroll() {
      if(!this.scroll){
        this.scroll = new BScroll(this.$refs.sellerwrapper, {
          click: true
        })
      }else{
        this.scroll.refresh()
      }
    },
    _initPicScroll() {
      if(this.dataCont.pics){
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin)*this.dataCont.pics.length -margin +'px'
        this.$refs.picList.style.width = width
        this.$nextTick(()=>{
          if(!this.picScroll){
            this.picScroll = new BScroll( this.$refs.picWrapper,{
              scrollX:true,
              eventPassthrough:'vertical'//垂直方向滚动
            })
          }else{
            this.picScroll.refresh()
          }
        })
      }
    }

  },
  components:{
    star,
    split,
    classMsg
  }
}

</script>


<style scope  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position:absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow:hidden
    .overview
      position:relative
      padding: 18px;
      .title
        margin-bottom:8px
        line-height:14px
        color:rgb(7,17,27)
        font-size: 14px
      .desc
        border-1px(rgba(7,17,27,0.1))
        padding-bottom: 18px
        font-size:0
        .star
          display:inline-block
          margin-right:8px
          line-height: 18px
          vertical-align:top
        .text
          margin-right:12px;
          display :inline-block
          vertical-align :top
          line-height: 18px
          font-size:10px
          color: rgb(77,85,93)


      .remark
        display:flex
        padding-top: 18px
        .block
          flex: 1
          text-align :center
          border-right:1px solid rgba(7,17,27,0.1)
          &:last-child
            border:none
          h2
            margin-bottom: 4px
            line-height:10px;
            font-size: 10px
            color:rgb(147,153,159)
          .content
            line-height:24px
            font-size 10px
            color: rgb(7,17,27)
          .stress
            font-size 24px;
      .favorite
        position :absolute
        right:5px
        top: 11px
        width:50px
        text-align: center
        span{
          display:block
        }
        .text
          margin-top:4px
          line-height:10px
          font-size 10px
          color: rgb(77,85,93)
    .bulletin
      padding:18px 18px 0
      .title
        margin-bottom:8px
        line-height:14px
        color:rgb(7,17,27)
        font-size: 14px
      .content-wrapper
        padding : 0 12px 16px
        border-1px(rgba(7,17,27,0.1))
        .content
          line-height: 24px
          font-size:12px
          color: rgb(240,20,20)

      .supports
        .supports-item
          border-1px(rgba(7,17,27,0.1))
          padding:12px 16px
          font-size:0px
          color:rgb(7,17,27)
          text-overflow :ellipsis
          overflow: hidden
          white-space:nowrap
          &:last-child
            border-1px-no()
          .icon
            display:inline-block
            margin-right:6px
            width: 16px
            height:16px
            vertical-align: bottom
            background-size:16px 16px
            background-repeat:no-repeat
          .text
            font-size 12px;
            line-height:16px;

    .pic
      padding: 18px
      .title
        line-height:14px
        font-size 14px
        color: rgb(7,17,27)
        margin-bottom :12px
      .pic-wrapper
        width: 100%
        overflow:hidden
        white-space:nowrap
        .pic-list
          font-size: 0
          .pic-item
            display:inline-block
            margin-right:6px
            width: 120px
            height:90px
    .info
      padding:18px 18px 0 18px
      color:rgb(7,17,27)
      .title
        padding-bottom 12px
        line-height: 14px
        border-1px(rgba(7,17,27,0.1))
        font-size:14px
      .info-item
        padding:16px 12px
        line-height: 16px
        border-1px(rgba(7,17,27,0.1))
        font-size:12px
        &:last-child
          border-1px-no()
</style>
