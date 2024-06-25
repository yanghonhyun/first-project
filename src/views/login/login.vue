<script setup>
defineOptions({
  name: 'loginPage'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//import {token, getToken} from "@/stores/counter.js"
//import {userLoginService} from '@/api/user.js'

const ruleForm = ref({
  username: '',
  password: ''
})
const router = useRouter()
//有后台数据时取消注释

//登录并获取token
/*const center = async () => {
  //表单先前验证
 await ruleFormRef.value.validate()
 const res = await userLoginService(ruleForm.value)
 //获取token
 getToken(res.data.data.token)
 if(token){
  router.push('/layoutIndex')
 }
  router.push('/layoutIndex')
}*/
//有后台时删除下列代码
const center = () => {
  router.push('/layoutIndex')
}
//用户名以及密码规则
const rule = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度为3-10个字符', trigger: 'blur' },
    {
      pattern: /^[0-9a-zA-Z]{6,15}$/,
      message: '用户名不能为空字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[0-9a-zA-Z]{6,15}$/,
      message: '密码长度为6-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}
//防止用户多次点击，频繁触发
const ruleFormRef = ref(null)
const get = ref(true)
let time = ref(6)
let timer = ''
const getCode = () => {
  get.value = false
  if (timer) {
    return
  }
  timer = setInterval(() => {
    time.value--
    if (time.value === 0) {
      clearInterval(timer)
      timer = ''
      time.value = 6
      get.value = true
    }
  }, 1000)
}
const change = ref(true)
</script>
<template>
  <div class="container">
    <el-col :span="12">
      <el-form
        status-icon
        :model="ruleForm"
        :rules="rule"
        ref="ruleFormRef"
        v-if="change"
      >
        <span
          style="
            font-size: large;
            font-size: 34px;
            display: inline-block;
            text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
            font-weight: 700;
            margin-bottom: 50px;
            user-select: none;
          "
          >注册页</span
        >
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="请输入用户名"
            v-model="ruleForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="text"
            placeholder="请输入密码"
            v-model="ruleForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="text"
            placeholder="请输入验证码"
            class="code"
          ></el-input>
          <span @click="getCode" style="cursor: pointer">{{
            get ? '获取验证码' : time + '秒后获取'
          }}</span>
        </el-form-item>
        <el-form-item>
          <span
            @click="change = false"
            style="padding-right: 100px; cursor: pointer"
            >go登录页</span
          >
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
      <el-form
        status-icon
        :model="ruleForm"
        :rules="rule"
        ref="ruleFormRef"
        v-else
      >
        <span
          style="
            font-size: large;
            font-weight: 700;
            display: inline-block;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
            font-size: 34px;
            margin-bottom: 50px;
            user-select: none;
          "
          >登录页</span
        >
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="请输入用户名"
            v-model="ruleForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="text"
            placeholder="请输入密码"
            v-model="ruleForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <span
            @click="change = true"
            style="padding-right: 100px; cursor: pointer"
            >go注册页</span
          >
          <el-button @click="center">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<style scoped>
.code {
  width: 500px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 600px;
  height: 800px;
  background-color: #ecf0f3;
  box-shadow:
    10px 10px 10px #d1d9e6,
    -10px -10px 10px #f9f9f9;
  border-radius: 10px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    box-shadow: inset 3px 3px 3px #ecf0f3;
  }
}
</style>
