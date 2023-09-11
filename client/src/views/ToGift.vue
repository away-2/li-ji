<template>
    <Header :title="state.topTitle ? '添加收礼' : '编辑收礼'"/>
    <div class="body-icon-item">
        <div class="icon-item" v-for="item in useStore.icon_title" :key="item.icon_id" @click="getThings(item.title)">
            <div class="icon-img" >
                <img :src="require(`../assets/images/gift_${item.icon_id}.png`)" alt="">
            </div>
            <div class="icon-title" >{{ item.title }}</div>
        </div>
    </div>
    <div class="gift-input">
        <div class="input-item" @click="toCalendar">
                <van-icon name="clock" size="25px" color="e03997"/>
                <span>日期</span>
                <div class="date">{{ state.currentDate }}</div>
                <van-icon name="arrow" size="25px"  class="icon-right"/>
                
        </div>
        <div class="input-item">
                <van-icon name="manager" size="25px" color="f37b1d"/>
                <span>亲友姓名</span>
                <input type="text" placeholder="点击右侧图标选择" v-model="state.name">
                <van-icon name="friends" size="25px"  class="icon-right"/>
        </div>
        <div class="input-item">
                <van-icon name="point-gift" size="25px" color="b745cb"/>
                <span>事由</span>
                <input type="text" placeholder="随礼事由" v-model="state.thing">
        </div>
        <div class="input-item">
                <van-icon name="gold-coin" size="25px" color="3eb93b"/>
                <span>贺礼</span>
                <input type="text" placeholder="随礼金额" v-model="state.money">
        </div>
        <div class="input-item">
                <van-icon name="label" size="25px" color="0081ff"/>
                <span>备注</span>
                <input type="text" placeholder="选填" v-model="state.remark">
        </div>
    </div>
    <div class="button">
        <van-button round block type="primary" color="#f76664" @click="submit">保存</van-button>
    </div>
    <Calendar @select="selectDate" ref="selectDateRef"/>
</template>

<script setup>
import Header from '../components/Header.vue'
import { ref, reactive } from 'vue'
import { useGiftStore } from '../store/gift.js'
import Calendar from '../components/Calendar.vue'
import axios from '../api'
import { useRouter } from 'vue-router'

const useStore = useGiftStore()
const router = useRouter()
const selectDateRef = ref(null)
const state = reactive({
    topTitle: true,
    currentDate: '请输入日期',
    name: '',
    thing: '',
    money: '',
    remark: '',
  
})

// 展示日历组件
const toCalendar = () => {
    selectDateRef.value.show = true
}
// 选择年月日
const selectDate = (value) => {
    // console.log(value);
    state.currentDate = value.join('-')
}

const getThings = (title) => {
    // console.log(title);
    state.thing = title
}

const submit = async() => {
    // console.log(state.currentDate,state.item_name);
    let data = JSON.parse(sessionStorage.getItem('token'))
    const res = await axios.post('/addGiftOut', {
        date: state.currentDate,
        name: state.name,
        thing: state.thing,
        money: state.money,
        remark: state.remark,
        user_id: data.id
    })
    if (res.code === '80000') {
        router.go(-1)
    }
    
}

</script>

<style lang="less" scoped>
@import '../assets/style/custom.less';

.body-icon-item {
    width: 380px;
    height: 200px;
    background-color: #fff;
    position: relative;
    margin: 15px;
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    .icon-item {
        width: 50px;
        height: 100px;
        // background-color: red;
        margin-left: 10px;
        margin-top: 10px;

        .icon-img {
            width: 50px;
            height: 50px;
            background-color: #f3f5f6;
            border-radius: 50%;

            img {
                width: 30px;
                height: 30px;
                margin-top: 10px;
                margin-left: 10px;
            }
        }
        .icon-img:hover {
            background-color: @primary;
        }

        .icon-title {
            font-size: 16px;
            margin-top: 10px;
            margin-left: 6px;
        }
    }
}
.gift-input{
    position: relative;
    background-color: #fff;
    width: 380px;
    height: 310px;
    left: 15px; 
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
    .date{
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