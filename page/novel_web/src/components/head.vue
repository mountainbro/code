<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import {useThemeStore} from '@/stores/theme'
  const theme = useThemeStore()
  // 修改主题
  function changeTheme() {
    theme.mode = theme.mode == 'moon' ? 'sun' : 'moon'
  }
  // 监听主题store,第二个参数代表组件卸载后继续保留监听
  theme.$subscribe((mutation,state)=>{
    setTheme(state.mode)
  },{ detached: true })
  //本地存储主题
  function setTheme(val: string) {
    localStorage.setItem('theme', val)
  }
  // 监听系统模式
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
      if (event.matches) {
        //dark mode
        theme.mode = 'moon'
      } else {
        //light mode
        theme.mode = 'sun'
      }
    })
  // 返回主页
  const router = useRouter()
  function goHome(){
    router.push({path:'/'})
  }
  </script>
  
  <template>
      <header>
        <nav class="nav">
          <div v-if="true" class="login">登录</div>
          <div v-else class="center">
            <div class="avatar">
              <img src="" alt="">
            </div>
          </div>
          <div>
            <Icon id="catalog"></Icon>
          </div>
          <div class="theme" @click="changeTheme">
            <Icon :id="theme.mode"></Icon>
          </div>
        </nav>
        <div>
          <div class="logo" @click="goHome">
            <img src="@/assets/img/logo.png" alt="">
            <span>ZBook</span>
          </div>
          <div class="search">
            <Icon id="search"></Icon>
            <input type="text" placeholder="输入书名">
            <Icon id="enter"></Icon>
  
          </div>
        </div>
      </header>
  </template>
  
  <style scoped>

  header {
    background-color: var(--bg-color-dark);
  }
  /* 顶部导航 */
  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 4.5;
    margin-left: 12px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color);
    /* opacity: .7; */
  }
  
  .nav>div {
    padding: 0 .8em;
    cursor: pointer;
  }
  
  .nav>div:hover {
    color: var(--text-color-dark);
  }
  header>div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  header>div>*{
    margin-bottom: 30px;
  }
  /* logo */
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2;
    cursor: pointer;
  }
  
  .logo img {
    width: 4em;
    max-width: 80px;
    border-radius: 8px;
  }
  
  .logo span {
    font-size: 28px;
    padding: .3em;
    letter-spacing: .5px;
    font-family: serif;
  }
  /* 搜索框 */
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 2.5;
    background-color: var(--bg-color);
    border-radius: 22.5px;
  }
  
  .search .icon {
    width: 55px;
  
  }
  .search input{
    width: 45vw;
    max-width: 450px;
    min-width: 250px;
    color:var(--text-color);
  }
  
  </style>
  