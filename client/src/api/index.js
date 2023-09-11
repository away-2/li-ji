import axios from 'axios'
import { showFailToast } from 'vant'


axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (res.status !== 200) {
    showFailToast('服务器异常')
  } else {
    if (res.data.code !== '80000') {
      showFailToast(res.data.msg)
      // return Promise.reject(res)
      return res.data
    }
    return res.data
  }
})

// 请求拦截
// axios.interceptors.request.use((config) => {
//   let jwtToken = window.localStorage.getItem('jwtToken')
//   if (jwtToken) {
//     // 将token携带在请求头中
//     config.headers.Authorization = jwtToken 
//   }
//   return config
// })

// // 响应拦截
// axios.interceptors.response.use(res => {
//   // 拦截报错的情况
//   if (res.data.code !== 0) {
//     return Promise.reject(res.data.error)
//   }
//   return res
// }, (error) => {
//   // status在400~500之间的我们认定为是登录过期
//   if (error.response.status >= 400 && error.response.status < 500) {
//     router.push('/login')
//   }
//   return Promise.reject(error.response.data.error)
// })

// export function post(url, body) {
//   return axios.post(BASE_URL+url, body)
// }


export default axios