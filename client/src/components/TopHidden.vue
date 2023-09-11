<template>
   <div class="header-wrapper" @scroll="scrollEvent" v-show="state.isScroll">
            <img src="../assets/images/logo.png" alt="" v-show="state.isImage">
            <div class="title">
                <span>{{ props.title }}</span>
            </div>
        </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
  
})
const state = reactive({
    isScroll: false,
    isImage: true
})
const scrollEvent = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop)
    if (scrollTop > 0) {
        state.isScroll = true
    } else {
        state.isScroll = false
    }
}

onMounted(async () => {
    window.addEventListener('scroll', scrollEvent, true) //监听滚动事件
    if(props.title === '礼记'){
        state.isImage = true
    }else{
        state.isImage = false
    }
})

// 离开该页面需要移除这个监听的事件，不然会报错
onUnmounted(() => {
    window.removeEventListener('scroll', scrollEvent)
})

</script>

<style lang="less" scoped>
.header-wrapper {
        width: 100vw;
        height: 80px;
        background-color: #fff;
        background:rgba(255, 255, 255, 0.92);
        position: fixed;
        top: 0;
        z-index:1;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 30px;
            height: 30px;
            margin: 10px;
        }
        .title {
            span {
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
</style>