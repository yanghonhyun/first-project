<script setup>
defineOptions({
  name: 'layoutMain'
})
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
  Crop,
  EditPen,
  SwitchButton
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter.js'
const router = useRouter()
const userStore = useCounterStore()
import { ref } from 'vue'
const isCollapse = ref(true)
const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const onCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('你确定要退出吗', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.reToken()
    userStore.setUser()
    router.push('/login')
  } else {
    router.push(`/${command}`)
  }
}
</script>

<template>
  <div class="common-layout" style="position: relative">
    <div class="box" style="position: absolute; right: 20px">
      <el-dropdown @command="onCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="50" :src="circleUrl" @click="onAvatarInfo" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile" :icon="User"
              >基本资料</el-dropdown-item
            >
            <el-dropdown-item command="avatar" :icon="Crop"
              >更换头像</el-dropdown-item
            >
            <el-dropdown-item command="password" :icon="EditPen"
              >重置密码</el-dropdown-item
            >
            <el-dropdown-item command="logout" :icon="SwitchButton"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :value="false">expand</el-radio-button>
          <el-radio-button :value="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          :default-active="$route.path"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="/">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">主页面</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="/layoutIndex">
            <el-icon><icon-menu /></el-icon>
            <template #title>聊天</template>
          </el-menu-item>
          <el-menu-item index="/music">
            <el-icon>
              <document />
            </el-icon>
            <template #title>音乐</template>
          </el-menu-item>
          <el-menu-item index="/musicList">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>歌词播放</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  margin-top: 100px;
}
</style>
