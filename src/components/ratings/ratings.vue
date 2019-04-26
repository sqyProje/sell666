<template>
  <div class="ratings" ref="ratingwrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{dataCont.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{dataCont.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <start :starSize="36" :starScore="dataCont.serviceScore"></start>
            <span class="score">{{dataCont.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <start :starSize="36" :starScore="dataCont.foodScore"></start>
            <span class="score">{{dataCont.foodScore}}</span>
          </div>
          <div class="deliverytime">
            <span class="title ">送达时间</span>
            <span class="time">{{dataCont.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @ratingtype_select="ratingTypeSelect" @content_toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(ItemCont.rateType,ItemCont.text)" class="rating-item border-1px" v-for="ItemCont in ratings">
            <div class="avatar">
              <img :src="ItemCont.avatar" width="28" height="28" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{ItemCont.username}}</h1>
              <div class="star-wrapper">
                <start :starSize="24" :starScore="ItemCont.score"></start>
                <span class="delivery" v-show="ItemCont.deliveryTime">{{ItemCont.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{ItemCont.text}}</p>
              <div class="recommend" v-show="ItemCont.recommend">
                <img  width="12" height="12" :src="ItemCont.rateType === 0 ? praise : notpraise" alt="">
                <span class="item" v-for="item in ItemCont.recommend">{{item}}</span>
              </div>
              <formatDate :ratingTime="ItemCont"></formatDate>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import start from "../../components/start/start.vue"
  import BScroll from "better-scroll"
  import praise from "../../../static/img/praise.png"
  import notpraise from "../../../static/img/notpraise.png"

  import ratingselect from "../ratingselect/ratingselect.vue"
  import formatDate from '../formatdate/formatdate.vue'
  import split from "../../components/split/split.vue"

  const ERR_Ok =0
  const ALL = 2
  //0 是满意 1 是不满意 吐槽
  export default {
  props:{
    dataCont:{
      type:Object
    }
  },
  data() {
    return {
      ratings:[],
      selectType:ALL,
      onlyContent:true,
      praise,
      notpraise
    }

  },
  created() {
    this.$http.get('api/ratings').then((response)=>{
      response = response.body
      if(ERR_Ok == 0){
        this.ratings = response.data

        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingwrapper, {
            click: true
          });
        });
      }
    }).then(error=>{
      //alert("暂无数据")
    })
  },
  methods: {
    ratingTypeSelect (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });

    },
    toggleContent(){
      this.onlyContent = !this.onlyContent
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    },
    needShow(type,text) {
      if(this.onlyContent && !text){
        return false
      }else if(this.selectType == ALL){
        return true
      }else{
        return type === this.selectType
      }
    }
  },
  components:{
    start,
    ratingselect,
    formatDate,
    split
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--stylus 语法配置-->
<style scoped  lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.ratings
  position:absolute
  top: 174px
  left: 0
  bottom: 0
  width: 100%
  overflow:hidden
  .overview
    display:flex
    padding:18px 0px
    .overview-left
      flex:0 0 137px
      width:137px
      padding:6px 0
      text-align: center;
      border-right:1px solid rgba(7,17,27,0.1)
      @media screen and (max-width:320px)
        flex:0 0 120px
        width:120px
      .score
        font-size:24px
        color:rgb(255,153,0)
        line-height:28px;
      .title
        font-size:12px
        color:rgb(7,17,27)
        line-height: 12px
        margin-top: 6px
        margin-bottom:8px
      .rank
        font-size:10px
        color:rgb(147,153,159)
        line-height: 10px
        margin-bottom:6px
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media screen and (max-width:320px)
        padding-left :6px
      .score-wrapper
        font-size: 0
        margin-bottom:8px
        .star,.title,.score
          display:inline-block
        .title
          vertical-align: top;
          font-size: 12px
          line-height 18px
          color:rgb(7,17,27)
        .star
          margin: 0 12px
          @media screen and (max-width:320px)
            margin: 0 6px
        .score
          vertical-align: top;
          font-size:12px
          line-height 18px
          color:rgb(255,153,0)
      .deliverytime
        font-size:0
        .title
          font-size: 12px
          line-height 18px
          color:rgb(7,17,27)
        .time
          font-size:12px
          margin: 0 12px
          color:rgb(147,153,159)
          @media screen and (max-width:320px)
            margin: 0 6px
  .rating-wrapper
    padding: 0 18px;
    position:relative
    .rating-item
      display:flex
      padding: 18px 0
      border-1px(rgba(7,17,27,0.1))
      .avatar
        flex :0 0 28px
        width:28px
        margin-right:12px;
        img
          border-radius 50%
      .content
        position:relative
        flex: 1
        h1
          font-size: 10px
          color:rgb(7,17,27)
          line-height: 12px
        .star-wrapper
          font-size:0
          margin-bottom:6px
          margin-top:4px
          .star
            display:inline-block
          .delivery
            font-size: 10px
            font-weight: 200
            color:rgb(147,153,159)
            line-height: 12px
            margin-left: 6px
        .text
          font-size: 10px
          color:rgb(7,17,27)
          line-height: 18px
        .recommend
          font-size: 0
          line-height: 16px
          span
            display :inline-block
            padding: 0 6px;
            border:1px solid rgba(7,17,27,0.1)
            font-size: 12px
            color:rgb(147,153,159)

            margin-left:8px
            margin-bottom :4px
        .time
          position: absolute
          right:0
          top:0
          font-size: 10px
          color:rgb(147,153,159)
          line-height: 12px
          font-weight :200
</style>
