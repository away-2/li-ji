// home 礼簿相关的接口
const router = require('koa-router')()
const userService = require('../controller/mySqlController.js')
const utils = require('../config/utils.js')


// 添加礼簿
router.post('/addGift', async (ctx, next) => {
  const {
    item_id,
    item_name,
    remark,
    date,
    user_id
  } = ctx.request.body
  // const date = utils.formateDate(new Date())
  try {
    const result = await userService.addGift([item_id, date, item_name, remark, user_id])
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

// 获取礼簿信息
router.post('/selectGift', async (ctx, next) => {
  try {
    const result = await userService.selectGift()
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

// 添加礼簿item
router.post('/addGiftItem', async (ctx, next) => {
  const {
    item_id,
    name,
    item_money,
    item_remark,
    follow_id,
    user_id
  } = ctx.request.body
  try {
    const result = await userService.addGiftItem([item_id, name, item_money, item_remark, follow_id, user_id])
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

// 通过follow_id查询礼簿item信息
router.post('/selectGiftItem', async (ctx, next) => {
  const {follow_id} = ctx.request.body
  try {
    const result = await userService.selectGiftItem(follow_id)
    // console.log(result);
    if (result.length) {
      ctx.body = {
        code: '80000',
        itemData: result,
        msg: '查找成功'
      }
    } else {
      ctx.body = {
        code: '80004',
        itemData: 'error',
        msg: '查找失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: '80002',
      itemData: error,
      msg: '服务器异常'
    }
  }
})

// 根据item_id查询礼簿信息
router.post('/selectGiftItemById', async (ctx, next) => {
  const {title} = ctx.request.body
  try {
    const result = await userService.selectGiftItemById(title)
    console.log(result);
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

// 根据person_name查询礼簿信息
router.post('/selectGiftItemByName', async (ctx, next) => {
  // const {name} = ctx.request.body
  try {
    const result = await userService.selectGiftItemByName()
    console.log(result);
    if (result.length) {
      ctx.body = {
        code: '80000',
        Data: result,
        msg: '查找成功'
      }
    } else {
      ctx.body = {
        code: '80004',
        Data: 'error',
        msg: '查找失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: '80002',
      Data: error,
      msg: '服务器异常'
    }
  }
})

// 修改礼簿item信息
router.post('/updateGiftItem', async (ctx, next) => {
  const {name, money, remark, item_id, user_id} = ctx.request.body
  let arr = [name, money, remark, item_id, user_id]
  console.log(arr);
  try {
    const result = await userService.updateGiftItem(arr)
    console.log(result);
    if (result.affectedRows) {
      ctx.body = {
        code: '80000',
        itemData: result,
        msg: '修改成功'
      }
    } else {
      ctx.body = {
        code: '80004',
        itemData: 'error',
        msg: '修改失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: '80002',
      itemData: error,
      msg: '服务器异常'
    }
  }
})

// 删除礼簿item信息
router.post('/deleteGiftItem', async (ctx, next) => {
  const {
    item_id
  } = ctx.request.body
  try {
    const result = await userService.deleteGiftItem(item_id)
    console.log(result);
    if (!result.length) {
      ctx.body = {
        code: '80000',
        itemData: result,
        msg: '删除成功'
      }
    } else {
      ctx.body = {
        code: '80004',
        itemData: 'error',
        msg: '删除失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: '80002',
      itemData: error,
      msg: '服务器异常'
    }
  }
})

module.exports = router