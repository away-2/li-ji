<template>
    <div class="user">
        <TopHidden :title="state.title"/>
        <BgImg />
        <div class="header-wrap" @click="toLogin">
            <div class="avatar">
                <img src="../../assets/images/avatar.jpg" alt="">
            </div>
            <div class="user-name">{{state.welcome}}，{{state.username}}~</div>
        </div>
        <div class="body-wrap">
            <div class="total-money">
                <div class="income-money">
                    <div class="income">0</div>
                    <div class="income-text">收礼</div>
                </div>
                <div class="expense-money">
                    <div class="expense">0</div>
                    <div class="expense-text">送礼</div>
                </div>
            </div>
            <div class="icon-text">
                <div class="icon-text-item" v-for="item in useStore.icon_title" :key="item.id">
                    <div class="icon">
                        <img :src="require(`../../assets/images/user1_${item.id}.png`)" />
                    </div>
                    <div class="text">{{ item.title }}</div>
                </div>
            </div> 
        </div>
        <div class="setting-cell-one">
            <div class="setting-cell-item" v-for="item in useStore.setting_title1" :key="item.id">
                <img :src="require(`../../assets/images/user2_${item.id}.png`)" alt="">
                <div class="text">{{ item.title }}</div>
                <van-icon name="arrow" size="20px" color="#8799a3"/>
            </div>
        </div>
        <div class="setting-cell-two">
            <div class="setting-cell-item" v-for="item in useStore.setting_title2" :key="item.id">
                <div class="img-text">
                    <img :src="require(`../../assets/images/user3_${item.id}.png`)" alt="">
                    <div class="text">{{ item.title }}</div>
                </div>
                <van-icon name="arrow" size="20px" color="#8799a3"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import BgImg from '../../components/BgImg.vue'
import TopHidden from '../../components/TopHidden.vue'
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMyStore } from '../../store/user.js'
import { welcome } from '../../utils/welcome.js'

const router = useRouter()
const route = useRoute()

const useStore = useMyStore()
// console.log(useStore.icon_title);
const state = reactive({
    welcome:'',
    title: '我的',
    username: '微信用户',
})


onMounted(async() =>{
    // 根据本地存储的token获取username
    let data = JSON.parse(sessionStorage.getItem('token'))
    if(!data){
        state.username
    } else {
        state.username = data.username
    } 
    
    // 根据时间转换欢迎语
    state.welcome = welcome(new Date())
})

const toRelationship = () => {
    router.push({path: '/relationship'})
}


const toLogin = () => {
    router.push({path: '/login'})
}
</script>

<style lang="less" scoped>
@import '../../assets/style/custom.less';
.user{
    height: sclc(100vh-50px);
    .header-wrap{
        position: relative;
        top: -180px;
        display: flex;
        .avatar{
            width: 80px;
            height: 80px;
            background-color: #f1f1f1;
            border-radius: 25px;
            overflow: hidden;
            margin: 20px 10px 20px 20px; 
            img{
                width: 80px;
                height: 80px;    
            }
          }
          .user-name{
                font-size: 20px;
                margin-top: 40px;
            }
    }
    .body-wrap{
        width: 350px;
        height: 180px;
        background-color: #fff;
        border-radius: 25px;
        position: relative;
        top: -200px;
        margin: 15px;
        .total-money{
            width: 350px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            .income-money{
                width: 100px;
                margin-left: 80px;
                border-right: 1px solid @primary-gray;
                .income{
                    font-size: 50px;
                    font-weight: bold;
                    
                }
                .income-text{
                    font-size: 15px;
                    color: @primary-gray;
                }
            }
            .expense-money{
                width: 100px;
                margin-left: 80px;
                .expense{
                    font-size: 50px;
                    font-weight: bold;
                }
                .expense-text{
                    font-size: 15px;
                    color: @primary-gray;

                }
            }
        }
        .icon-text{
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-left: 30px;
            
            .icon-text-item{
               width: 80px;
               .icon{
                width: 50px;
                height: 50px;
                img{
                    width: 30px;
                    height: 30px;
                }
               } 
               .text{
                font-size: 12px;
                margin-top: -10px;
                margin-left: -10px;
               }
            }
        }
    }
    .setting-cell-one{
        width: 350px;
        height: 100px;
        background-color: #fff;
        border-radius: 25px;
        position: relative;
        top: -200px;
        margin: 15px;
        .setting-cell-item{
            height: 50px;
            display: flex;

            // border-bottom: 1px solid @primary-gray;
            img{
                width: 30px;
                height: 30px;
                margin: 10px;
            }
            .text{
                font-size: 18px;
                margin: 17px 175px 20px 10px;
            }
            .van-icon{
                margin-top: 15px;
            }
        }
    }
    .setting-cell-two{
        width: 350px;
        height: 200px;
        background-color: #fff;
        border-radius: 25px;
        position: relative;
        top: -200px;
        margin: 15px;
        .setting-cell-item{
            height: 50px;
            display: flex;
            // border-bottom: 1px solid @primary-gray;
            justify-content: space-between;
            .img-text{
                display: flex;
                img{
                width: 30px;
                height: 30px;
                margin: 10px;
            }
            .text{
                font-size: 18px;
                margin: 17px 170px 20px 10px;
            }
            }
            
            .van-icon{
                margin-top: 15px;
                margin-right: 25px;
            }
        }
    }
}
</style>