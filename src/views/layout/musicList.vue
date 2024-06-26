<script setup>
import { lrc } from '@/utils/data'
import { ref, onMounted } from 'vue'
/*import {getMusicList, getCodeList} from '@/api/music.js'
//因没有网络资源此页面为静态页面，下列代码可将其变为动态页面
//网络请求
const res = getMusicList()
list = res.data.data
//假设下面数组为请求得到的数据
const list = ref([
  {musicname: '', id:'', address: '', src:''},
  {musicname: '', id:'', address: '', src:''},
  {musicname: '', id:'', address: '', src:''},
])*/
//解析时间
const audio = ref(null)
const parseTime = (timeStr) => {
  const pars = timeStr.split(':')
  return +pars[0] * 60 + +pars[1]
}
//歌词数组
const arr = []
const lorList = () => {
  const music = lrc.split('\n')
  //console.log(music)
  for (let i = 0; i < music.length; i++) {
    const timeWord = music[i].split(']')
    const timeStr = timeWord[0].substring(1)
    const obj = {
      time: parseTime(timeStr),
      word: timeWord[1]
    }
    arr.push(obj)
  }
}
lorList()
console.log(arr)
//播放当前时间
const findIndex = () => {
  let curTime = audio.value.currentTime
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].time > curTime) {
      console.log('歌词对应时间', arr[i].time)
      return i - 1
    }
  }
  return arr.length - 1
}
const ulValue = ref(null)
onMounted(() => {
  const box = document.querySelector('.box')
  const lis = document.querySelectorAll('.box li')
  //console.log(box, lis, ulValue.value)
  const liHeight = lis[0].clientHeight
  //console.log(lis[0])
  const boxHeight = box.clientHeight
  console.log('li高度，盒子高度', liHeight, boxHeight)
  //最大偏移量
  let maxOffset = ulValue.value.clientHeight - boxHeight
  const setOffset = () => {
    let index = findIndex()
    console.log('index', index)
    let offset = liHeight * index + liHeight / 2 - boxHeight / 2
    console.log('偏移距离', offset)
    if (offset < 0) {
      offset = 0
    }
    if (offset > maxOffset) {
      offset = maxOffset
    }
    ulValue.value.style.transform = `translateY(-${offset}px)`
    let li = document.querySelector('.active')
    if (li) {
      li.classList.remove('active')
    }
    li = lis[index]
    if (li) {
      li.classList.add('active')
      console.log(li)
    }
  }
  audio.value.addEventListener('timeupdate', setOffset)
})

/*
//传递选中音乐信息,lyricList即该静态页面中的lrc,当有网络请求将lyricList 赋值给lrc即可
const lyricList = ref([])
const src = ref('')
const passLyric = (address, srcAddress) => {
  lyricList = getCodeList(address)
  //给audio切换播放地址
  src.value = srcAddress
}*/
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <!--有网络数据将audio换成这个
        <audio :src=src></audio>!-->
        <audio
          src="src\assets\music.mp3"
          controls
          ref="audio"
          style="height: 50px; margin-left: 180px"
        ></audio>
      </el-header>
      <el-container>
        <el-aside width="200px"
          >歌列表
          <!--有后台数据时取消注释
            <ul class="musicList">
            <li v-for="item in list" :key="item.id" @click="passLyric(item.address, item.src)">
            <span>{{ item.musicname }}</span>
            </li>
          </ul>-->
        </el-aside>
        <el-col :span="8">
          <el-main>
            <div class="box">
              <ul ref="ulValue">
                <li v-for="item in arr" :key="item.time">{{ item.word }}</li>
              </ul>
            </div>
          </el-main>
        </el-col>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-main {
  background-color: #000;
  margin-top: 50px;
  border-radius: 10px;
  color: #666;
  text-align: center;
  display: flex;
  justify-content: center;
}
.box {
  height: 420px;
  overflow: hidden;
}
.el-main ul {
  list-style: none;
}
.el-main ul li {
  width: 420px;
  height: 30px;
  line-height: 30px;
  transition: 0.2s;
}
audio {
  width: 450px;
  margin: 0px 0;
}
.active {
  color: #fff;
  /* font-size: ; */
  transform: scale(1.2);
}
/*有后台数据时取消注释
.musicList{
  list-style: none;
  li{
    width: 100%;
    height: 30px;
    border-radius: 3px;
    background-color: #fff;
    border-bottom: 1px solid #000;
  }
}
.el-aside{
  overflow: scroll;
}*/
</style>
