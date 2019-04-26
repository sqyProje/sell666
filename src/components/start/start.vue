<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass" track-by="$index"></span>
  </div>


</template>
<!--
track-by="$index"

如果没有唯一的键供追踪，可以使用 track-by="$index"，它强制让 v-for 进入原位更新模式：
片断不会被移动，而是简单地以对应索引的新值刷新。这种模式也能处理数据数组中重复的值。

这让数据替换非常高效，但是也会付出一定的代价。因为这时 DOM 节点不再映射数组元素顺序的改变，
不能同步临时状态（比如 <input> 元素的值）以及组件的私有状态。因此，如果 v-for 块包含
 <input> 元素或子组件，要小心使用 track-by="$index"
-->

<script type="text/ecmascript-6">
  const LENGTH=5
  const CLA_ON='on'
  const CLA_HALF='half'
  const CLA_OFF='off'

  export default {
    props:{
      starSize:{
        type:Number
      },
      starScore:{
        type:Number
      }
    },
    computed:{
      //控制添加不同的class
      starType(){
        return 'star-'+this.starSize;
      },
      itemClasses() {
        let result=[]
        // 计算总分
        let score = Math.floor(this.starScore*2)/2
      /*  console.log(score)*/
        //计算半星
        let hasDecimal = score % 1 !==0
        let integer = Math.floor(score)

        //计算正星
        for(let i=0; i < integer;i++){
          result.push(CLA_ON)
        }
        if(hasDecimal){
          result.push(CLA_HALF)
        }
        while (result.length < LENGTH){
          result.push(CLA_OFF)
        }
        return result

      }

    }

  }

</script>


<style scope   lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display:inline-block
      background-repeat:no-repeat
    &.star-48
      .star-item
        width:20px;
        height: 20px
        margin-right: 22px
        background-size:20px 20px
        &:last-child
          margin-right:0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width:15px;
        height: 15px
        margin-right: 6px
        background-size:15px 15px
        &.last-child
          margin-right:0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width:10px;
        height: 10px
        margin-right: 3px
        background-size:10px 10px
        &.last-child
          margin-right:0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')

</style>
