// ============================================================
// 路由表：所有页面路由集中定义在这里
// 面试知识点：
// 1. history 模式基于 HTML5 History API（pushState），URL 干净无 # 号，
//    但刷新深层路径需要服务端配合（本项目在 vercel.json 里做了重写）
// 2. 路由懒加载：() => import('...') 是动态导入语法，
//    Vite 会把每个页面单独打包成一个 chunk，用户访问哪个页面才加载哪个，
//    首屏更快——这是"性能优化"面试常考点
// ============================================================
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于我' }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('../views/NotesView.vue'),
    meta: { title: '学习笔记' }
  },
  {
    // :id 是动态路由参数，通过 route.params.id 获取
    path: '/notes/:id',
    name: 'NoteDetail',
    component: () => import('../views/NoteDetailView.vue'),
    meta: { title: '笔记详情' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: '项目展示' }
  },
  {
    path: '/interview',
    name: 'Interview',
    component: () => import('../views/InterviewView.vue'),
    meta: { title: '面试准备' }
  },
  {
    // 通配路由放在最后，兜底所有未匹配的路径
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 切换路由后滚动到页面顶部，避免停留在上一个页面的滚动位置
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局前置守卫：切换页面时同步更新浏览器标签页标题
// 面试知识点：路由守卫是 Vue Router 的核心机制之一，
// 常见的还有组件内守卫、独享守卫，可用于登录鉴权等场景
router.beforeEach((to) => {
  document.title = `${to.meta.title} - 黄雯宏的个人博客`
})

export default router
