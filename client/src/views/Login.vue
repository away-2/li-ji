<template>
    <Header :title="state.isLogin ? '登录' : '注册'" />
    <div class="wrap">
        <img src="../assets/images/logo.png" alt="" class="logo">
        
        <van-form v-if="state.isLogin" @submit="onSubmit">
            <van-cell-group inset>
                <van-field 
                v-model="state.username" 
                name="用户名" 
                label="用户名" 
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field 
                v-model="state.password" 
                type="password" 
                name="密码" 
                label="密码" 
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
                <p class="change-btn" @click="changeBtn">没有账号，前往注册</p>
            </div>
        </van-form>

        <van-form v-else @submit="onSubmit" >
            <van-cell-group inset>
                <van-field 
                v-model="state.username" 
                name="用户名" 
                label="用户名" 
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field 
                v-model="state.password" 
                type="password" 
                name="密码" 
                label="密码" 
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field 
                v-model="state.repassword" 
                type="state.repassword" 
                name="确认密码" 
                label="确认密码" 
                placeholder="请确认密码"
                :rules="[{ required: true, message: '再次输入密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    注册
                </van-button>
                <p class="change-btn" @click="changeBtn">已有账号，前往登录</p>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Header from '../components/Header.vue'
import axios from '../api/index'
import { showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
    username: '',
    password: '',
    repassword: '',
    isLogin: true,

})

const onSubmit = async() => {
    // console.log(state.username,state.password,state.repassword)
    if (state.isLogin) { // 登录请求
       const res = await axios.post('/login',{
        username: state.username,
        password: state.password,
       })

    // console.log(res);
    if (res.code === '80000') {
        localStorage.setItem('token', JSON.stringify(res.data))
        router.push({path: '/page/home'})
    }
  

    } else {  // 注册请求
        const res = await axios.post('/register',{
            username: state.username,
            password: state.password
        })
        showSuccessToast(res.msg)
        state.isLogin = true
   
    }
}
const changeBtn = () => {
    state.isLogin = !state.isLogin
}
</script>

<style lang="less" scoped>
.wrap{
  height: calc(100% - 46px);
  padding: 30px 20px 0 20px;
//   background: green;
  .logo{
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .change-btn{
    text-align: center;
    margin: 10px 0;
    // color: red;
    font-size: 14px;
  }
}
</style>