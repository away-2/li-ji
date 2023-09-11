<template>
    <Header :title="state.topTitle" />
    <div class="input">
        <div class="input-item" @click="toCalendar">
            <van-icon name="manager" size="25px" />
            <span>来宾姓名</span>
            <input type="text" placeholder="点击右侧图标选择" v-model="state.data.name">
            <van-icon name="friends" size="25px" class="icon-right" @click="toFriend" />
        </div>
        <div class="input-item">
            <van-icon name="gold-coin" size="25px" />
            <span>礼金</span>
            <input type="text" placeholder="收礼金额" v-model="state.data.item_money">
        </div>
        <div class="input-item">
            <van-icon name="label" size="25px" />
            <span>备注</span>
            <input type="text" placeholder="选填" v-model="state.data.item_remark">
        </div>
    </div>
    <div class="button">
        <van-button round block type="primary" color="#f76664" @click="deleteItem">删除</van-button>
        <van-button round block type="primary" color="#f76664" to="/giftItem" @click="submit">保存</van-button>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import axios from '../api'

const router = useRouter()
const route = useRoute()

const state = reactive({
    data: {},
    itemData: [],
    topTitle: '编辑收礼'

})

const toFriend = () => {
    router.push({ path: '/page/friend' })
}
onMounted(async () => {
    state.data = JSON.parse(route.query.item)
})

// 修改礼簿item信息
const submit = async () => {
    // console.log(state.name, state.money);
    const res = await axios.post('/updateGiftItem', {
        name: state.data.name,
        money: state.data.item_money,
        remark: state.data.item_remark,
        item_id: state.data.item_id
    })
    if (res.code === '80000') {
        router.go(-1)
    }
    
}
// 删除礼簿item信息
const deleteItem = async () => {
    const { itemData } = await axios.post('/deleteGiftItem')
}
</script>


<style lang="less" scoped>
.input {
    position: relative;
    background-color: #fff;
    top: 10px;
    width: 350px;
    height: 190px;
    left: 30px;
    border-radius: 15px;

    // margin: 5px;
    .input-item {
        display: flex;
        position: relative;
        margin: 10px;
        padding: 15px;

        input {
            border: 0px;
            outline: none;
            background-color: rgba(0, 0, 0, 0);
            font-size: 15px;
        }

        span {
            display: inline-block;
            width: 90px;
            text-align: left;
            position: relative;
            top: 6px;
            left: 5px;
            font-size: 15px;
        }

        .name {
            position: absolute;
            top: 20px;
            left: 130px;
            color: #757575;
            font-size: 15px;
        }

        .icon-right {
            position: absolute;
            right: 10px;
        }

    }
}

.button {
    width: 90%;
    position: absolute;
    bottom: 20px;
    left: 18px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;

}
</style>
