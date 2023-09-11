<template>
    <div class="home">
        <TopHidden :title="state.title"/>
        <BgImg />
        <div class="content">
            <div class="content-item" @click="toLogin">
                <div class="content-item-add" @click="toAddGift">
                    <div class="icon">
                        <van-icon name="plus" size="80" color="#8799a3" />
                    </div>
                    <div class="text">
                        <p>添加礼簿</p>
                    </div>
                </div>
            </div>
            <div class="content-item" v-for="item in state.allData" :key="item.item_id" v-if="state.allData.length">
                <div class="things-item" @click="toGiftItem(item)">
                    <div class="title">{{ item.item_name }}</div>
                    <div class="thing-number">共{{ state.totalThing }}笔</div>
                    <div class="money-sum">￥{{ state.totalMoney }}</div>
                    <div class="date">{{ $formateDate(item.date) }}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- <test /> -->
</template>

<script setup>
import axios from '../../api';
import BgImg from '../../components/BgImg.vue'
import TopHidden from '../../components/TopHidden.vue'
import { reactive, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const $formateDate = inject('$formateDate')

const state = reactive({
    allData: [],
    totalThing: 0,
    totalMoney: 0,
    title: '礼记',
    isLogin: true,

})

const toAddGift = () => {
    router.push({ path: '/addGift' })
}

onMounted(async () => {  
    let res = JSON.parse(sessionStorage.getItem('token'))
    if(!res){
        state.isLogin = false
    }else{
        const { data } = await axios.post('/selectGift')   
        let newData = data.filter((item, index, data) => {
            return item.user_id == res.id
        }) 
        //  console.log(newData,'??????');
        state.allData = newData 
        // state.totalThing = newData.length
    }  
})

const toGiftItem = (item) => {
    router.push({ path: '/giftItem', query: { id: item.item_id, title:  item.item_name} })
}



</script>

<style lang="less" scoped>
@import '../../assets/style/custom.less';
.home {
    height: sclc(100vh-50px);
    .content {
        width: 100%;
        position: relative;
        top: -140px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 20px;
        place-items: center center;
        .content-item {
            width: 170px;
            height: 200px;
            background-color: #fff;
            border-radius: 30px 50px 50px 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
                text-align: center;
            }
            .text {
                font-size: 15px;
                margin-top: 20px;
                margin-left: 10px;
                color: @primary-gray;
            }
            .things-item {
                position: relative;

                .title {
                    font-size: 25px;
                    font-weight: bold;
                }
                .thing-number {
                    font-size: 15px;
                }
                .money-sum {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>