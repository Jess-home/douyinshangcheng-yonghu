import { defineStore } from 'pinia'
import { login, getInfo, logout } from '@/api/user.js'
import { 
    getToken, setToken, removeToken, removeUserId ,
    getLocalLang
} from '@/utils/auth.js'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: null,
    backData: {}
  }),
  actions: {
    // 登录
    login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            setToken(res.data.userinfo.token)
            this.token = res.data.userinfo.token
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            this.userInfo = res.data
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    // 判断是否登录
    isLogin() {
      return new Promise((resolve, reject) => {
        if (this.token && this.userInfo) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.userInfo = null
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    afterRePwd(){
      return new Promise((resolve, reject) => {
        this.token = ''
        this.userInfo = null
        removeToken()
        resolve()
      })
    },
    getLanguage(){
      if(this.userInfo && this.userInfo.lang){
        return this.userInfo.lang.language_name
      }else{
        return '未设置'
      }
    },
    setLanguage(lang){
      this.userInfo.lang = lang
    },
    setBackData(data){
      this.backData = {...this.backData, ...data}
    }
  }
})

export default useUserStore
