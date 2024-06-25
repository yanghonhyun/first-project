//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'
export const useCounterStore = defineStore(
  'counter',
  () => {
    const token = ref('')
    //获取token
    const getToken = (Token) => {
      token.value = Token
    }
    //移除token退出登录时使用
    const reToken = () => {
      token.value = ''
    }
    //获取用户信息
    const user = ref('')
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data
    }
    //重置用户信息
    const setUser = () => {
      user.value = ''
    }
    return {
      token,
      getToken,
      reToken,
      getUser,
      setUser,
      user
    }
  },
  //本地持久化储存
  { persist: true }
)
