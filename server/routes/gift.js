// 礼簿相关的接口
const router = require('koa-router')()
const userService = require('../controller/mySqlController.js')


// 添加礼簿
router.post('/addGift', async (ctx, next) => {
    const {
        date,
        item_name,
        remark
    } = ctx.request.body
    try {
        const result = await userService.addGift([date, item_name, remark])
        // console.log(result);
        if (result.affectedRows !== 0) {
            ctx.body = {
                code: '80000',
                data: 'ok',
                msg: '添加成功'
            }
        } else {
            ctx.body = {
                code: '80004',
                data: 'error',
                msg: '添加失败'
            }
        }
    } catch (error) {
        ctx.body = {
            code: '80002',
            data: error,
            msg: '服务器异常'
        }
    }
})

// 

module.exports = router