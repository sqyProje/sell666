<template>
  <div class="ratingselect" ref="ratings">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive"
            :class="{'active':selectType===2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive"
            :class="{'active':selectType===0}">{{desc.positive}}
        <span class="count">{{positive.length}}</span></span>
      <span @click="select(1,$event)" class="block negative"
            :class="{'active':selectType===1}">{{desc.negative}}
        <span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <span class="correct">√</span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default{
    props:{
      ratings:{
        type:Array,
        default () {
          return [];
        }
      },
      selectType:{
        type:Number,
        default : ALL
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default() {
          return {
            all: "全部",
            positive:"满意",
            negative:"不满意"
          }

        }
      }
    },
  computed:{
    /*计算正向评价的数组*/
    positive(){
      return this.ratings.filter((rating)=>{
        return rating.rateType === POSITIVE
      })
    },
    /*计算负向评价*/
    negative() {
      return this.ratings.filter((rating)=>{
        return rating.rateType === NEGATIVE;
      })
    }
  },
  methods:{
    select(type,event){
      if(!event._constructed){
        return
      }
      //this.selectType = type
      this.$emit('ratingtype_select',type)//派发事件通知父组件（food）变化，父组件接收方式@ratingtype_select=‘方法名字’
    },
    toggleContent(event){
      if(!event._constructed){
        return
      }
      //this.onlyContent = !this.onlyContent
      this.$emit('content_toggle')
    }

  }

  }

</script>


<style scope lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding:18px 0
      margin:0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .block
        display:inline-block
        padding:8px 12px
        margin-right:8px
        line-height:16px
        -webkit-border-radius: 1px
        -moz-border-radius: 1px
        border-radius: 1px
        font-size:12px
        color:rgb(77,83,93)
        &.active
          color:#fff
        .count
          margin-left: 2px
          font-size:8px;
        &.positive
          background:rgba(0,160,220,0.2)
          &.active
            background:rgb(0,160,220)
        &.negative
          background:rgba(77,85,93,0.2)
          &.active
            background:rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgba(7,17,27,0.1)
      color:rgb(147,153,159)
      font-size:0
      &.on
        .correct
          background :#00c850
      .correct
        display:inline-block
        vertical-align:top
        width:20px
        height: 20px
        font-size:12px;
        text-align:center
        border-radius:10px;
        color:#fffdfe
        background:#b7babf
      .text
        display:inline-block
        vertical-align:top
        font-size:12px;
        margin-left:4px;



</style>
