<template>
    <Header :title="state.topTitle" />
    <div class="input">
        <div class="input-item" @click="toCalendar">
                <van-icon name="clock" size="25px"/>
                <span>日期</span>
                <div class="date">{{ state.currentDate }}</div>
                <van-icon name="arrow" size="25px"  class="icon-right"/>
                
        </div>
        <div class="input-item">
                <van-icon name="bill" size="25px"/>
                <span>礼簿名称</span>
                <input type="text" placeholder="请输入名称" v-model="state.item_name">
        </div>
        <div class="input-item">
                <van-icon name="label" size="25px"/>
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
import { ref, reactive } from 'vue'
import Calendar from '../components/Calendar.vue'
import Header from '../components/Header.vue'
import axios from '../api'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectDateRef = ref(null)
const state = reactive({
    currentDate: '请输入日期',
    item_name: '',
    remark:'',
    topTitle: '添加礼簿'
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
// 提交礼簿信息
const submit = async() => {
    console.log(state.currentDate,state.item_name);
    let data = JSON.parse(sessionStorage.getItem('token'))
    const res = await axios.post('/addGift', {
        date: state.currentDate,
        item_name: state.item_name,
        remark: state.remark,
        user_id: data.id,
    })

    // user_id = data.id
    router.push({path: '/page/home'})
}

</script>

<style lang="less" scoped>
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
