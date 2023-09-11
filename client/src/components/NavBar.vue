<template>
    <van-tabbar v-model="active" route active-color="#f76664">
        <van-tabbar-item icon="wap-home-o" to="/page/home">礼记</van-tabbar-item>
        <van-tabbar-item icon="point-gift-o" to="/page/gift">送礼</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/page/friend">亲友</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/page/user">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(0)

</script>

<style lang="less" scoped>

</style>