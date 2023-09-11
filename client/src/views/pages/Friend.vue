<template>
  <div class="friend">
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
    <div class="body-wrap" v-show="state.isLogin">
      <van-index-bar>
        <div v-for="item in filterData" :key="item.letter">
          <van-index-anchor :index="item.letter"></van-index-anchor>
          <div class="content" v-for="row in item.list" :key="row.id">
            <span>{{ row.name }}</span>
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script setup>
import axios from '../../api'
import BgImg from '../../components/BgImg.vue'
import TopSearch from '../../components/TopSearch.vue'
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import pinyin from 'js-pinyin'

const router = useRouter()
const filterData = ref([])
const state = reactive({
  isLogin: false
})

onMounted(async () => {
  let res = JSON.parse(sessionStorage.getItem('token'))
  if (!res) {
    state.isLogin = false
  } else {
    state.isLogin = true
    const { Data } = await axios.post('/selectGiftItemByName')
    const { data } = await axios.post('/selectGiftOut')
    let newArr = Data.concat(data)
    let newData = newArr.filter((item, index, newArr) => {
      return item.user_id == res.id
    })

    const mapData = newData

    mapData.map((item) => {
      item.pinyin = pinyin.getFullChars(item.name);
    });
    let provice = {};
    mapData.map((item) => {
      const Initials = item.pinyin[0].toUpperCase();
      // 如果对象里有当前字母项则直接 push 一个对象,如果没有则创建一个新的键并赋值;
      if (provice[Initials]) {
        provice[Initials].push(item);
      } else {
        provice[Initials] = [item];
      }
    });

    // 将数据转为数组，并按字母顺利排列
    for (let key in provice) {
      const obj = { letter: key, list: provice[key] };
      filterData.value.push(obj);
    }
    filterData.value.sort((a, b) => {
      return a.letter.localeCompare(b.letter);
    });

  }

})



const toGift = () => {
  router.push({ path: '/toGift' })
}



</script>

<style lang="less" scoped>
.friend {
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

.body-wrap {
  position: relative;
  top: -200px;
  width: 380px;
  margin: 8px;
  z-index: 0;

  .van-index-bar {

    // background-color: #fff;
    .content {
      width: 380px;
      height: 60px;
      background-color: #fff;
      margin: 10px;
      border-radius: 20px;

      span {
        font-size: 18px;
        margin-left: 20px;
        line-height: 60px;
        display: flex;
        align-items: center;

      }
    }
  }
}
</style>
