<template>
    <Header :title="state.title" />
    <Search />
    <div class="body-gift-item" v-if="state.itemData.length">
    <div class="body-item" v-for="item in state.itemData" :key="item.item_id" @click="toItemDetail(item)" >
        <div class="gift-name">{{ item.name }}</div>
        <div class="gift-item">
            <div class="gift-money">{{ item.item_money }}</div>
            <div class="gift-text">礼金</div>
        </div>
    </div></div>
</template>

<script setup>
import axios from '../api'
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Search from '../components/Search.vue'

const router = useRouter()
const route = useRoute()

const state = reactive({
    title: '',
    itemData: [],

})

onMounted(async () => {
    // 顶部导航栏name
    state.title = route.query.title
    // 查找giftItem信息
    const { itemData } = await axios.post('/selectGiftItem',{
        follow_id: route.query.id,
        user_id: JSON.parse(sessionStorage.getItem('token')).id
    })
    state.itemData = itemData
    console.log(itemData);

})

const toItemDetail = (item) =>{
    // console.log(item, '~~~~~~~~~~~~~~~~~~');
    router.push({path: '/itemDetail', query: {item: JSON.stringify(item)} })
}
</script>

<style lang="less" scoped>
.header-wrap {
    background-color: #fbfbfb;
    width: 100vw;
    height: 60px;
    margin-bottom: 2px;

    .header {
        position: relative;

        .van-icon {
            left: 10px;
            top: 20px;
        }

        span {
            font-size: 18px;
            display: block;
            margin: auto;
            text-align: center;
        }
    }
}

.body-item {
    width: 350px;
    height: 100px;
    background-color: #fff;
    border-radius: 20px;
    position: relative;
    margin: 10px;

    .gift-name {
        font-size: 20px;
        font-weight: bold;
        color: #f76664;
        float: left;
        margin: 40px 60px;
    }
    .gift-item{
        float: right;
        margin: 30px 80px 0px 0px;
        .gift-money {
        font-size: 20px;
        font-weight: bold;
        color: #f76664;
        margin-bottom: 1px;
        
    }

    .gift-text {
        font-size: 13px;
        color: #f76664;
        margin-left: 2px;

    }
    }
    
}
</style>