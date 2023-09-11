<template>
    <div class="search-wrap">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            >
    <template #action>
        <van-icon name="add-o" color="#f76664" size="35px" @click="AddGiftItem"/>
    </template>
        </van-search>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const AddGiftItem = () => {
    router.push({path: '/addGiftItem'})
}
</script>

<style lang="less" scoped>

</style>
