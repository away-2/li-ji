<template>
    <div class="gift" @scroll="scrollEvent" v-show="state.isScroll">
        <van-icon name="add-o" color="#f76664" size="35px" @click="toGift" />
        <van-search
                    v-model="value"
                    shape="round"
                    background="rgba(255,255,255,0)"
                    placeholder="请输入搜索关键词"
                    />
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted} from 'vue'

const state = reactive({
    isScroll: '',
})
const scrollEvent = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop)
    if (scrollTop > 0) {
        //滚动大于0的时候要做的操作
        state.isScroll = true
    } else {
        state.isScroll = false
    }
}
onMounted(async() => { 
    window.addEventListener('scroll', scrollEvent, true) //监听滚动事件
})
    
// 离开该页面需要移除这个监听的事件，不然会报错
onUnmounted(() => {
    window.removeEventListener('scroll', scrollEvent)
})
</script>

<style lang="less" scoped>
.gift{
    display: flex;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 80px;
    background:#fff;
    z-index: 1;
    .van-icon{
        margin: 20px 20px;
    }
    .van-search{
        margin: 10px;
    }
}
</style>
