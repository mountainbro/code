import {defineStore} from 'pinia' 

export const useThemeStore = defineStore('theme',{
  state:() => {
    return {
      mode: localStorage.getItem('theme')!='moon'?'sun':'moon',
    }
  }
})