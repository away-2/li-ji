// 礼簿相关的接口
const router = require('koa-router')()
const userService = require('../controller/mySqlController.js')


// 添加礼簿
router.post('/addGift', async (ctx, next) => {
    const {
        item_id,
        date,
        item_name,
        remark
    } = ctx.request.body
   
    try {
        const result = await userService.addGift([item_id, date, item_name, remark])
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
router.post('/selectGift',async(ctx, next) => {   
    try {
        const result = await userService.selectGift()
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

// 添加礼簿item
router.post('/addGiftItem', async(ctx, next) => {
  const {item_id, person_name, item_money, item_remark} = ctx.request.body
  try {
    const result = await userService.addGiftItem([item_id, person_name, item_money, item_remark])
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

// 查询礼簿item信息
router.post('/selectGiftItem', async(ctx,next) => {
    const {item_id} = ctx.request.body
    try {
        const result = await userService.selectGiftItem(item_id)
        console.log(result);
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

// 修改礼簿item信息
router.post('/updateGiftItem', async(ctx,next) => {
  const {item_id} = ctx.request.body
  try {
      const result = await userService.updateGiftItem(item_id)
      console.log(result);
      if (result.length) {
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
router.post('/deleteGiftItem', async(ctx,next) => {
  const {item_id} = ctx.request.body
  try {
      const result = await userService.deleteGiftItem(item_id)
      console.log(result);
      if (result.length) {
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