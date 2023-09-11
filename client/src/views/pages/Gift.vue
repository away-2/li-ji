<template>
    <div class="gift">
        <BgImg />
        <TopSearch />
        <div class="header-wrap">
            <div class="icon">
                <van-icon name="add-o" color="#f76664" size="35px" @click="toGift" />
            </div>
            <div class="gift-search">
                <van-search v-model="value" shape="round" background="rgba(255,255,255,0)" placeholder="请输入搜索关键词" />
            </div>
        </div>
        <div class="gift-out-content" v-for="item in state.data" :key="item.id" @click="toDetail" v-show="state.isLogin">
            <div class="gift-left">
                <div class="name">{{ item.name }}</div>
                <div class="thing">{{ item.thing }}</div>
                <div class="date">{{ $formateDate(item.date) }}</div>
            </div>
            <div class="gift-right">￥{{ item.money }}</div>
        </div>
    </div>
</template>

<script setup>
import axios from '../../api'
import BgImg from '../../components/BgImg.vue'
import TopSearch from '../../components/TopSearch.vue'
import { reactive, onMounted, onUnmounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const $formateDate = inject('$formateDate')

const state = reactive({
    name: '',
    thing: '',
    date: '',
    money: '',
    data: [],
    isLogin: false,

})

onMounted(async () => {
    let res = JSON.parse(sessionStorage.getItem('token'))
    if (!res) {
        state.isLogin = false
    } else {
        state.isLogin = true
        // 查找giftOut信息
        const { data } = await axios.post('/selectGiftOut')
        // console.log(route.query.id, '11111111');
        let newData = data.filter((item, index, data) => {
            return item.user_id == res.id
        })
        state.data = newData
        //  console.log(state.data);
    }
})

const toGift = () => {
    router.push({ path: '/toGift' })
}

const toDetail = () => {
    // router.push({ path:'/toGift' })
}
</script>

<style lang="less" scoped>
@import '../../assets/style/custom.less';

.gift {
    width: 100vw;
    height: sclc(100vh-50px);
}

.header-wrap {
    position: relative;
    top: -200px;

    .icon {
        margin: 20px;
    }
}

.gift-out-content {
    width: 350px;
    height: 100px;
    background-color: #fff;
    position: relative;
    top: -200px;
    margin: 15px;
    border-radius: 20px;
    display: flex;

    .gift-left {
        margin: 10px 50px 15px 50px;

        .name {
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .thing {
            font-size: 18px;
            color: @primary-gray;
            margin-bottom: 10px;
        }

        .date {
            font-size: 18px;
            color: @primary-gray;
        }
    }

    .gift-right {
        font-size: 25px;
        font-weight: bold;
        color: @primary;
        align-items: center;
        margin: 40px;
    }
}</style>