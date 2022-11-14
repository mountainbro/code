<script setup lang="ts">
import { defineProps ,reactive,ref,onBeforeMount} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
// const info = defineProps({
//   data: Object
// })
let loading = ref(true)

const getData = () => {
  const data = {
  cover:'src/assets/img/0.jpg',
  title:'三体',
  author:'刘慈欣',
  intro:'每个人的书架上都该有套《三体》！关于宇宙最狂野的想象！就是它！征服世界的中国科幻神作！包揽九项世界顶级科幻大奖！出版16个语种，横扫30国读者！奥巴马、雷军、马化腾、周鸿袆、潘石屹、扎克伯格……强推！刘慈欣获得2018年度克拉克想象力贡献社会奖！刘慈欣是中国科幻小说的最主要代表作家，亚洲首位世界科幻大奖“雨果奖”得主，被誉为中国科幻的领军人物。'
}
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(data)
    },2000)
  })
}
let data:any = ref({})

onBeforeMount( async()=>{
  data.value = await getData()
  loading.value = false
})

// 跳转到搜索页面
function goSearch(event:any){
  console.log(event)
  // 如果点击作者名称,则搜索作者
  if (event.target.classList.contains('author')){
    console.log('点击作者')
  }
}
</script>
  
<template>
  <div class="rankItem" :class="{skeleton:loading}" @click="goSearch">
    <div class="cover">
      <img v-if="data.cover" :src="data?.cover" alt="">
    </div>
    <div class="index">1</div>
    <div class="info">
      <div class="title">
        {{data?.title}}
      </div>
      <div class="author">{{data?.author}}</div>
      <div class="intro">
        {{data?.intro}}
      </div>
    </div>
  </div>
</template>
<style scoped>
.rankItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--border-color);
  margin: 1em;
  padding: 1em;
  cursor: pointer;
}

.rankItem:hover {
  background: linear-gradient(90deg, var(--bg-color-dark), var(--bg-color))
}

.cover {
  width: 5rem;
  height: 7.5rem;
  margin: 0 1.5rem 0 0;
}

.cover img {
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info{
  width: calc(100% - 10rem);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 7.5rem;
}
.index {
  padding: 1.5rem;
  order: -1;
}
.title {
  font-size: 1.2rem;
  color: var(--text-color);
  line-height: 2;
  
}
.author {
  font-size: 1rem;
  min-width: 3em;
  color: var(--text-color-dark);
  /* line-height: 2; */
}

.intro {
  
  /* height: 44px; */
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-size: .8em;
  overflow: hidden;
  margin: .5rem 0;
  
}
.title:hover,.author:hover,.intro:hover{
  opacity: .8;
}
/* 骨架屏样式 */
.skeleton .title{
  height: 1.35rem;
  width: 8rem;
}
.skeleton .author{
  height: 1.2rem;
  width: 5rem;
}
.skeleton .intro{
  height: 2.2rem;
}
.skeleton .cover,
.skeleton .title,
.skeleton .author,
.skeleton .intro{
  /* background-color: var(--text-color-dark); */
  background: linear-gradient(
    100deg,
    var(--text-color-dark) 40%,
    var(--bg-color) 50%,
    var(--text-color-dark) 60%
  ) var(--text-color-dark) repeat;
  background-size: 200% 100%;
  background-position-x: 120%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading{
  to{
    background-position-x: -20%;
  }
}

</style>
  