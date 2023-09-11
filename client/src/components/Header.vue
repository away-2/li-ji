<template>
  <van-nav-bar :title="props.title" left-arrow @click="toUpper"/>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const toUpper = () => history.back()

</script>

<style lang="less" scoped>
</style>
<style>
.van-nav-bar .van-icon{
    color: black; 
    font-size: 25px;
}
.van-nav-bar__content{
    height: 70px;
}
</style>