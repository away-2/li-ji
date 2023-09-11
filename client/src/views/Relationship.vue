<template>
    <div class="top-nav-bar">
        <van-nav-bar
            title="中国家庭称谓计算器"
            left-arrow
            @click-left="onClickLeft"
            />
    </div>
    <div class="body-content-input" style="height: 300px; background: red;">

    </div>
    <div class="footer-grid-cell">

    </div>
</template>

<script setup>
import { reactive } from 'vue'

const onClickLeft = () => history.back()
</script>

<style lang="less" scoped>

</style>
<style>
.van-nav-bar .van-icon{
    color: black;
    font-size: 25px;
}
.van-nav-bar__content{
    height: 60px;
}
</style>