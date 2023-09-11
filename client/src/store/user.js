import {
    defineStore
} from 'pinia'

export const useMyStore = defineStore({
    id: 'user',
    state() {
        return {
            icon_title: [{
                    id: 1,
                    title: '我的家庭'
                },
                {
                    id: 2,
                    title: '数据导出'
                },
                {
                    id: 3,
                    title: '统计分析'
                },
                {
                    id: 4,
                    title: '亲友关系'
                },
            ],
            setting_title1: [{
                    id: 1,
                    title: '在线客服'
                },
                {
                    id: 2,
                    title: '意见反馈'
                },
            ],
            setting_title2: [{
                    id: 1,
                    title: '设置'
                },
                {
                    id: 2,
                    title: '常见问题'
                },
                {
                    id: 3,
                    title: '分享'
                },
                {
                    id: 4,
                    title: '关于'
                },
            ],
        }
    },
    actions: {

    }
})