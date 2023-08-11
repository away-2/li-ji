// gift 礼簿相关的接口
const router = require('koa-router')()
const userService = require('../controller/mySqlController.js')
const utils = require('../config/utils.js')


// 添加礼簿
router.post('/addGiftOut', async (ctx, next) => {
  const {
    id,
    date,
    name,
    thing,
    money,
    remark,
    user_id
  } = ctx.request.body
  try {
    const result = await userService.addGiftOut([ id, date, name, thing, money, remark, user_id])
    console.log(result);
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

// 查询giftOut信息
router.post('/selectGiftOut', async (ctx, next) => {
  const {id} = ctx.request.body
  try {
    const result = await userService.selectGiftOut(id)
    // console.log(result);
    if (result.length) {
      ctx.body = {
        code: '80000',
        data: result,
        msg: '查找成功'
      }
    } else {
      ctx.body = {
        code: '80004',
        data: 'error',
        msg: '查找失败'
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
module.exports = router