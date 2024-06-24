//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  /*const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }*/
  const token = ref('')
  //获取token
  const getToken = (Token) => {
    token.value = Token
  }
  return {
    token,
    getToken
  }
})
