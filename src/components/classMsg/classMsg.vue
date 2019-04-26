<template>
<span class="icon" :class="classMsg[classMsgType]"></span>

</template>

<script type="text/ecmascript-6">
export default{
  props:{
    classMsgType:Number
  },
  data() {
    return{
      classMsg:["decrease","discount","special","invoice","guarantee"]

    }
  },
  created() {
  }
}

</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .support .decrease
      bg-image('decrease_1')
  .support .discount
      bg-image('discount_1')
  .support .guarantee
      bg-image('guarantee_1')
  .support .invoice
      bg-image('invoice_1')
  .support .special
      bg-image('special_1')
  .supports .decrease
      bg-image('decrease_2')
  .supports .discount
      bg-image('discount_2')
  .supports .guarantee
      bg-image('guarantee_2')
  .supports .invoice
      bg-image('invoice_2')
  .supports .special
      bg-image('special_2')

  .menu-wrapper .decrease
    bg-image('decrease_4')
  .menu-wrapper .discount
    bg-image('discount_4')
  .menu-wrapper .guarantee
    bg-image('guarantee_4')
  .menu-wrapper .invoice
    bg-image('invoice_4')
  .menu-wrapper .special
    bg-image('special_4')

  .seller-content .supports  .decrease
    bg-image('decrease_4')
  .seller-content .supports  .discount
    bg-image('discount_4')
  .seller-content .supports  .guarantee
    bg-image('guarantee_4')
  .seller-content .supports  .invoice
    bg-image('invoice_4')
  .seller-content .supports  .special
    bg-image('special_4')
</style>
