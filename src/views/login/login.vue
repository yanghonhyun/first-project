<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const ruleForm = ref({
  username: '',
  password: ''
})
const router = useRouter()
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
          <span @click="getCode">{{
            get ? '获取验证码' : time + '秒后获取'
          }}</span>
        </el-form-item>
        <el-form-item>
          <span @click="change = false" style="padding-right: 100px"
            >登录页</span
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
          <span @click="change = true" style="padding-right: 100px"
            >登录页</span
          >
          <el-button @click="center">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<style scoped>
.code {
  width: 600px;
}
.container {
  width: 600px;
  height: 800px;
  background-color: aliceblue;
  border-radius: 10px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
