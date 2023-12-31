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
    let _sql = `insert into addGift set item_id=?, date=?, item_name=?, remark=?,user_id=?;`
    return allService.query(_sql, values)
}

// 查询礼簿信息
const selectGift = () => {
    let _sql = `select * from addGift;`
    return allService.query(_sql)
}

// 添加礼簿item
const addGiftItem = (values) => {
  let _sql = `insert into addItem set item_id = ?, name = ?, item_money = ?, item_remark = ?, follow_id = ?, user_id = ?;`
  return allService.query(_sql, values)
}



// 根据follow_id查询礼簿item
const selectGiftItem = (follow_id) =>{
  let _sql = `select * from addItem where follow_id = ${follow_id};`
  return allService.query(_sql)
}

// 查询礼簿
const selectGiftItemById = (title) =>{
  let _sql = `select addGift.item_id, item_name, name, item_money from addItem, addGift where addItem.follow_id = addGift.item_id;`
  return allService.query(_sql)
}

// 根据person_name查询礼簿item
const selectGiftItemByName = () =>{
  let _sql = `select * from addItem ;`
  return allService.query(_sql)
}

// 修改礼簿item
const updateGiftItem = (values) => {
  let _sql = `update addItem set name=?, item_money=?, item_remark=? where item_id=?;`
  return allService.query(_sql,values)
}

// 删除礼簿item
const deleteGiftItem = () => {
  let _sql = `delete from addItem where item_id = ?;`
  return allService.query(_sql)
}

// 添加送礼信息
const addGiftOut = (values) => {
  let _sql = `insert into giftOut set id = ?, date = ?, name = ?, thing = ?, money = ?, remark = ?, user_id = ?;`
  return allService.query(_sql, values)
}
// 查看送礼item
const selectGiftOut = () => {
  let _sql = `select * from giftOut;`
  return allService.query(_sql)
}

// login
const login = (username, password) => {
  let _sql = `select * from user where username ="${username}" and password ="${password}";`
  return allService.query(_sql)
}
// register
const register = (values) => {
  let _sql = `insert into user set username = ?, password = ?;`
  return allService.query(_sql,values)
}
// 根据username查找用户信息
const selectUser = (username) => {
  let _sql = `select * from user where username = "${username}";`
  return allService.query(_sql)
}
module.exports = {
    addGift,
    selectGift,
    addGiftItem,
    selectGiftItem,
    selectGiftItemById,
    selectGiftItemByName,
    updateGiftItem,
    deleteGiftItem,
    addGiftOut,
    selectGiftOut,
    login,
    register,
    selectUser,
}