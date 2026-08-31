<!-- ============================================================
     顶部导航组件
     面试知识点：
     1. <router-link> 渲染为 a 标签，但跳转不刷新页面；
        激活状态自动加 router-link-active 类名，用它实现高亮
     2. 移动端菜单开关用 ref 保存状态，点击遮罩/链接后重置
     ============================================================ -->
<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="logo" @click="menuOpen = false">
        <!-- 头像占位：姓氏首字圆形徽标 -->
        <span class="logo-avatar">黄</span>
        <span class="logo-text">黄雯宏的博客</span>
      </router-link>

      <!-- 桌面端导航：768px 以下隐藏 -->
      <nav class="nav-links">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path">
          {{ item.label }}
        </router-link>
      </nav>

      <!-- 移动端菜单按钮：768px 以上隐藏 -->
      <button class="menu-btn" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <span class="menu-line" :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- 移动端下拉菜单，用 v-show 控制；点击链接后收起 -->
    <nav v-show="menuOpen" class="mobile-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// 导航数据：集中维护，以后加页面只改这里
const navItems = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我' },
  { path: '/notes', label: '学习笔记' },
  { path: '/projects', label: '项目展示' },
  { path: '/interview', label: '面试准备' }
]

// 移动端菜单开关状态
const menuOpen = ref(false)
</script>

<style scoped>
.site-header {
  position: sticky; /* 吸顶：滚动时导航固定在顶部 */
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px); /* 毛玻璃效果 */
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 17px;
}

.logo-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-size: 15px;
  background: var(--color-primary);
}

.nav-links {
  display: flex;
  gap: 26px;
  font-size: 15px;
}

/* 未激活链接的颜色 */
.nav-links a {
  color: var(--color-text-2);
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--color-primary);
}

/* router-link 激活时（当前页）自动获得 router-link-active 类 */
.nav-links a.router-link-active {
  color: var(--color-primary);
  font-weight: 600;
}

/* 汉堡按钮：默认隐藏，移动端显示 */
.menu-btn {
  display: none;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
}

/* 用伪元素 + 中间 span 画三条线 */
.menu-line,
.menu-line::before,
.menu-line::after {
  content: '';
  position: absolute;
  left: 8px;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.25s, opacity 0.25s;
}

.menu-line {
  top: 50%;
  transform: translateY(-50%);
}

.menu-line::before {
  left: 0;
  top: -6px;
}

.menu-line::after {
  left: 0;
  top: 6px;
}

/* 打开状态：三条线变 X */
.menu-line.open {
  background: transparent;
}

.menu-line.open::before {
  transform: translateY(6px) rotate(45deg);
}

.menu-line.open::after {
  transform: translateY(-6px) rotate(-45deg);
}

.mobile-nav {
  display: none;
  flex-direction: column;
  padding: 8px 20px 16px;
  border-top: 1px solid var(--color-border);
  background: #fff;
}

.mobile-nav a {
  padding: 10px 4px;
  font-size: 15px;
  color: var(--color-text-2);
  border-bottom: 1px solid var(--color-border);
}

.mobile-nav a:last-child {
  border-bottom: none;
}

.mobile-nav a.router-link-active {
  color: var(--color-primary);
  font-weight: 600;
}

/* 移动端断点：切换导航形态 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-btn {
    display: block;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
