<template>
    <Header :title="state.title" />
    <div class="search-wrap">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            >
    <template #action>
        <van-icon name="add-o" color="#f76664" size="35px" @click="AddGiftItem(id)"/>
    </template>
        </van-search>
    </div>
    <div class="body-gift-item" >
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
import { reactive, onMounted, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from '../components/Header.vue'


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
        user_id: JSON.parse(localStorage.getItem('token')).id
    })
    if (itemData === 'error'){
        state.itemData = ''
    }else{
        state.itemData = itemData
        // console.log(itemData, '?????????');
    }
    

})

const AddGiftItem = (id) => {
    router.push({path: '/addGiftItem', query: { id: route.query.id } })
}

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
    width: 380px;
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