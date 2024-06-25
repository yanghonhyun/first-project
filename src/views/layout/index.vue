<script setup>
defineOptions({
  name: 'layoutIndex'
})
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
const tabPosition = ref()
const userValue = ref(true)
const messageValue = ref(false)
const manngeValue = ref(false)

const change = (string) => {
  if (string === 'user') {
    userValue.value = true
    messageValue.value = false
    manngeValue.value = false
  } else if (string === 'message') {
    userValue.value = false
    messageValue.value = true
    manngeValue.value = false
  } else if (string === 'mannge') {
    userValue.value = false
    messageValue.value = false
    manngeValue.value = true
  }
}
const date = new Date()
const formttedDate = date.toLocaleString('zh-CN', { hour12: false })
const tableData = ref([
  {
    date: formttedDate,
    mood: '有点难受',
    diary: '今天玩了一会，学了一会',
    place: '学校'
  },
  {
    date: formttedDate,
    mood: '有点难受',
    diary: '今天玩了一会，学了一会',
    place: '学校'
  },
  {
    date: formttedDate,
    mood: '有点难受',
    diary: '今天玩了一会，学了一会',
    place: '学校'
  },
  {
    date: formttedDate,
    mood: '有点难受',
    diary: '今天玩了一会，学了一会',
    place: '学校'
  },
  {
    date: formttedDate,
    mood: '有点难受',
    diary: '今天玩了一会，学了一会',
    place: '学校'
  },
  {
    date: formttedDate,
    mood: '有点难受',
    diary: '今天玩了一会，学了一会',
    place: '学校'
  }
])
const drawer = ref(false)
const innerDrawer = ref(false)
const formValue = ref({
  date: formttedDate,
  mood: '',
  diary: '',
  place: ''
})
//编辑完确认操作
const confirm = () => {
  drawer.value = false
  tableData.value.push(formValue.value)
}
</script>
<template>
  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <el-radio-button value="top">顶部</el-radio-button>
    <el-radio-button value="right">右边</el-radio-button>
    <el-radio-button value="bottom">底部</el-radio-button>
    <el-radio-button value="left">左边</el-radio-button>
  </el-radio-group>

  <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <el-tab-pane label="用户" @click="change('user')">用户</el-tab-pane>
    <el-tab-pane label="信息" @click="change('message')">信息</el-tab-pane>
    <el-tab-pane label="管理" @click="change('mannge')">管理</el-tab-pane>
    <el-tab-pane label="退出">退出</el-tab-pane>
  </el-tabs>
  <!--用户日记表格-->
  <el-table :data="tableData" style="width: 100%" v-if="userValue">
    <el-table-column fixed prop="date" label="日期" width="150" />
    <el-table-column prop="mood" label="心情" width="120" />
    <el-table-column prop="diary" label="日记" width="120" />
    <el-table-column prop="place" label="地点" width="120" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small" @click="drawer = true"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!--抽屉-->
  <el-drawer v-model="drawer" title="写点今天的事情吧" size="50%">
    <div>
      <el-button @click="innerDrawer = true">Click me!</el-button>
      <el-drawer
        v-model="innerDrawer"
        title="添加新事件"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <p>_(:зゝ∠)_</p>
      </el-drawer>
      <!--插槽位置-->
      <page-container>
        <template #extra>
          <span>进行编辑</span>
        </template>
      </page-container>
      <!--编辑-->
      <div>今天心情怎么样</div>
      <el-input
        v-model="formValue.mood"
        style="width: 240px"
        autosize
        type="textarea"
        placeholder="Please input"
      />
      <div style="margin: 20px 0" />
      <div>想写点什么</div>
      <el-input
        v-model="formValue.diary"
        style="width: 240px"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
      />
    </div>
    <div>在什么地方</div>
    <el-input v-model="formValue.place" style="width: 200px"></el-input>
    <el-button @click="confirm">确定</el-button>
  </el-drawer>
</template>
<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
