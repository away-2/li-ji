// 让node能连接上mysql
const mysql = require('mysql')
const config = require('../config')

// 创建线程池
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
})

// 连接数据库，执行sql语句
const allService = {
  query: function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => { // 连接数据库
        if (err) {
          reject(err)
        } else { // 连接成功
          connection.query(sql, values, (err, rows) => { // 执行sql语句
            if (err) {
              reject(err)
            } else { // sql语句执行成功
              resolve(rows)
            }
            connection.release() // 断开连接
          })
        }
      })
    })
  }
}

// 添加礼簿
const addGift = (values) => {
    let _sql = `insert into addGift set item_id=?, date=?, item_name=?, remark=?;`
    return allService.query(_sql, values)
}

// 查询礼簿信息
const selectGift = () => {
    let _sql = `select * from addGift;`
    return allService.query(_sql)
}

// 添加礼簿item
const addGiftItem = (values) => {
  let _sql = `insert into addItem set item_id = ?, person_name = ?, item_money = ?, item_remark = ?;`
  return allService.query(_sql, values)
}

// 查询礼簿item
const selectGiftItem = (follow_id) =>{
  let _sql = `select * from addItem where follow_id=${follow_id};`
  return allService.query(_sql)
}
 
module.exports = {
    addGift,
    selectGift,
    addGiftItem,
    selectGiftItem,

    
}