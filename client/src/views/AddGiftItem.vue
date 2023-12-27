<template>
        <Header :title="state.topTitle" />
        <div class="input">
        <div class="input-item" @click="toCalendar">
                <van-icon name="manager" size="25px"/>
                <span>来宾姓名</span>
                <input type="text" placeholder="点击右侧图标选择" v-model="state.name">
                <van-icon name="friends" size="25px"  class="icon-right" @click="toFriend"/>
                
        </div>
        <div class="input-item">
                <van-icon name="gold-coin" size="25px"/>
                <span>礼金</span>
                <input type="text" placeholder="收礼金额" v-model="state.money" >
        </div>
        <div class="input-item">
                <van-icon name="label" size="25px"/>
                <span>备注</span>
                <input type="text" placeholder="选填" v-model="state.remark">
        </div>
    </div>
    <div class="button">
        <van-button round block type="primary" color="#f76664" @click="submit" to="/giftItem">保存</van-button>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import { reactive, inject } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import axios from '../api'

const router = useRouter()
const route = useRoute()

const state = reactive({
    name: '',
    money: '',
    remark: '',
    id: '',
    topTitle: '添加收礼'

})

const toFriend = () => {
    router.push({ path: '/page/friend'})
}

const submit = async() => {
    // const result = await axios.post('/selectGift')
    // console.log(result, '111111111');
    let data = JSON.parse(localStorage.getItem('token'))
    console.log(route.query.id, '99999999');
    let id = route.query.id
    const res = await axios.post('/addGiftItem', {
        name: state.name,
        item_money: state.money,
        item_remark: state.remark,
        follow_id: id,
        user_id: data.id
    })
    if (res.code === '80000') {
        history.back()
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/custom.less';
.input{
    position: relative;
    background-color: #fff;
    top: 10px;
    width: 350px;
    height: 190px;
    left: 30px; 
    border-radius: 15px;
    // margin: 5px;
    .input-item{
    display: flex;
    position: relative;
    margin: 10px;
    padding: 15px;
    input{
        border:0px;
        outline: none;
        background-color: rgba(0, 0, 0, 0);
        font-size: 15px;
    }
    span{
        display: inline-block;
        width: 90px;
        text-align: left;
        position: relative;
        top: 6px;
        left: 5px;
        font-size: 15px;
    }
    .name{
        position: absolute;
        top: 20px;
        left: 130px;
        color: #757575;
        font-size: 15px;
    }
    .icon-right{
        position: absolute;
        right: 10px;
    }
   
    }
}
.button{
    width: 90%;
    position: absolute;
    bottom: 20px;
    left: 18px;
    
}

</style>
