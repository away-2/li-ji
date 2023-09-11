<template>
 <van-popup v-model:show="show" :style="{ height:'46%' }" position="bottom">
    <van-date-picker
    v-model="currentDate"
    title="选择日期"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="chooseDate"
    />
</van-popup>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

const currentDate = ref([])

const emits = defineEmits(['select'])
// 点击确定
const chooseDate = ({selectedValues}) =>{
    // console.log(selectedValues);
    show.value = false
    emits('select', selectedValues)
} 
// 暴露属性让让父组件得到
defineExpose({
    show
})
</script>

<style lang="less" scoped>

</style>