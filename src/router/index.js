import { createRouter, createWebHashHistory } from 'vue-router'
// 引入需要跳转的页面组件
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Game from '@/views/Game.vue'

const routes = [
  {
    path: '/', // 路由路径
    name: 'Home', // 路由名称（可选，方便编程式导航）
    component: Home // 对应组件
  },
    {
    path: '/game', // 游戏页面路径
    name: 'Game', // 路由名称（可选，但推荐写，方便编程式导航）
    component: Game // 对应Game组件
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 哈希模式（GitHub Pages推荐）
  routes
})

export default router