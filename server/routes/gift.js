// 礼簿相关的接口
const router = require('koa-router')()
const userService = require('../controllers/mySqlControll.js')

router.prefix('/home')


module.exports = router