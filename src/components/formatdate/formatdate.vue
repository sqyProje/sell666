<template>
<div class="time">{{ratingTime.rateTime | formatDate}}</div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from "../../common/js/formatdata"
//vue里面的filters
export default {
  props: {
    ratingTime:{
      type:Object
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  }
}


</script>


<style scope lang="stylus" rel="stylesheet/stylus">
</style>
