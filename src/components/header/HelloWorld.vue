<template>
  <div class="header">
    <div class="content-wrapper" @click="detailsFlagOpen">
      <div class="avatar">
        <img width="64" height="64" :src="dataCont.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{dataCont.name}}</span>
        </div>
        <div class="description">
          {{dataCont.description}}/{{dataCont.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="dataCont.supports">
          <classMsg :classMsgType="dataCont.supports[0].type"> </classMsg>
         <!-- <span class="icon" :class="ClassMsg[dataCont.supports[0].type]"></span>-->
          <span class="text">{{dataCont.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="dataCont.supports" class="supports-count" @click="detailsFlagOpen">
        <span class="count">{{dataCont.supports.length}}个</span>
         <i class="icon-keyboard_arrow_right"> > </i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{dataCont.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"> > </i>
    </div>
    <div class="background">
      <img :src="dataCont.avatar" width="100%" height="100%" alt="">
    </div>
    <!--详情-->
    <transition name="fade">
      <div class="detail" v-show="detailsFlag"  >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1>粥品香坊（回龙观）</h1>
            <div class="star-wrapper">
              <star :starSize="36" :starScore="dataCont.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="dataCont.supports">
              <li class="supports-item" v-for="(v ,i) in dataCont.supports">
                <classMsg :classMsgType="dataCont.supports[i].type" > </classMsg>
                <!-- <span class="icon" :class="ClassMsg[dataCont.supports[i].type]"></span>-->
                <span class="text">{{dataCont.supports[i].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletins">{{dataCont.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="detailsFlagClose">
          <i> × </i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  // 新注册关于星星的组件 star.vue(子组件)
  import  classMsg from '../classMsg/classMsg.vue'
  import  star from '../../components/start/start.vue'

  export default {
    props: {
      dataCont: Object,
      classMsg:Array
    },
    //定义变量控制详情的显示和隐藏
    data() {
      return {
        detailsFlag:false
      }
    },
    //定义方法
    methods: {
      detailsFlagOpen() {
        this.detailsFlag = true
      },
      detailsFlagClose() {
        this.detailsFlag = false
      }
    },
    created() {
      //定义个数组进行控制类名的切换减 惠
     // this.ClassMsg=["decrease","discount","special","invoice","guarantee"]
    },
    components :{
      star,
      classMsg
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--stylus 语法配置-->
<style scoped   lang="stylus"  rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
  //二倍图三倍图的使用判断
  .header
    color:#fff
    position:relative
    background: rgba(7,17,27,0.5)
    overflow:hidden
    .content-wrapper
      padding:24px 12px 18px 24px
      font-size: 0
      position: relative
      .icon-keyboard_arrow_right
        margin-left:2px
        line-height:24px
        font-size:10px
        display: inline-block
      .avatar
        display:inline-block
        img
          border-radius:2px
      .content
        display:inline-block
        margin-left:16px
        .title
          margin:2px 0 8px 0
          .brand
            display: inline-block
            width:30px
            height:18px
            bg-image('brand')
            vertical-align: top
            background-size: 30px 18px
            background-repeat :no-repeat
          .name
            margin-left:6px;
            font-size:16px;
            line-height:18px
            font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
           .icon
             width:12px
             height:12px;
             margin-right:4px
             display:inline-block
             vertical-align:top
             background-size 12px
             background-repeat:no-repeat
          .text
            line-height:12px
            font-size 10px
      .supports-count
        position: absolute
        right: 12px
        bottom:14px
        font-size:12px
        background:rgba(0,0,0,0.2)
        border-radius 14px
        padding:0 8px
        height: 24px
        line-height: 24px
        text-align: center
        .count
          vertical-align:top
          font-size:10px
    .bulletin-wrapper
      height:28px
      line-height:28px
      //font-size: 0
      padding:0 11px 0 12px
      white-space :nowrap
      overflow:hidden
      text-overflow: ellipsis
      background :rgba(7,17,27,0.2)
      position relative
      .bulletin-title
        display:inline-block
        width:22px
        height:12px
        bg-image('bulletin')
        vertical-align:top
        margin-top:8px
        background-size:22px 12px
        background-repeat:no-repeat
      .bulletin-text
        font-size: 12px
        margin:0 4px
        vertical-align :top
      .icon-keyboard_arrow_right
        position:absolute
        right:10px;

    .background
      position:absolute
      left: 0
      top: 0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)

      /*strat控制关闭按钮随内容高度始终保持在底部*/
    /*.detail
      position:fixed
      left: 0
      top: 0
      z-index :100
      oveflow:auto
      background:rgba(7,17,27,0.8)
      width:100%
      height:100%
      .detail-wrapper
        min-height 100%
        .detail-main
          margin-top:64px;
          padding-bottom:64px;
      .detail-close
        position: relative
        width:32px
        height:32px
        clear: both
        margin:-64px auto 0
        font-size 32px*/
       /*end*/
      .fade-enter-active,.fade-leave-active
        transition: all .2s linear;
      .fade-enter,.fade-leave-to /* .slide-fade-leave-active for below version 2.1.8 */
        opacity :0.5
      .detail
        position:fixed
        left: 0
        top: 0
        z-index :100
        overflow:auto
        width:100%
        height:100%
        background:rgba(7,17,27,0.8)
        .detail-wrapper
          min-height 100%
          width:100%
          .detail-main
            margin-top:64px;
            padding-bottom:64px
            &>h1
              font-size: 16px
              line-height: 16px
              text-align:center
              font-weight:700
            .star-wrapper
              margin-top: 18px
              padding:2px 0
              text-align:center
            .title
              display:flex
              width:80%
              margin:28px auto 24px
              .line
                flex: 1
                border-top:1px solid rgba(255,255,255,0.2)
                position:relative
                top:6px
              .text
                font-size: 14px
                padding:0 12px;
                font-weight:700
            .supports
              width:80%
              margin: 0 auto
              .supports-item
                margin-bottom: 12px
                padding:0 12px
                font-size:0px
                &:last-child
                  margin-bottom:0px
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

            .bulletins
              font-size 12px
              width:80%
              margin: 0 auto
              line-height:24px
    .detail-close
          position: relative
          width:32px
          height:32px
          clear: both
          margin:-64px auto 0
          font-size 32px

</style>
