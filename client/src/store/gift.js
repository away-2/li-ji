import { defineStore } from 'pinia'

export const useGiftStore = defineStore({
    id: 'gift',
    state() {
        return {
            icon_title:[
                { icon_id: 1,title: '结婚' },
                { icon_id: 2,title: '宝宝' },
                { icon_id: 3,title: '周岁' },
                { icon_id: 4,title: '乔迁' },
                { icon_id: 5,title: '生日' },
                { icon_id: 6,title: '升学' },
                { icon_id: 7,title: '拜寿' },
                { icon_id: 8,title: '探望' },
                { icon_id: 9,title: '白事' },
                { icon_id: 10,title: '其他' },
           ],
           
        }
    },
    actions:{
 
    }
})