<!-- ============================================================
     根组件：整个应用的布局框架
     结构 = 顶部导航 + 路由出口（页面内容区） + 页脚
     面试知识点：<router-view> 是路由出口，当前路由匹配到的
     页面组件会渲染在这里；路由切换时只有中间区域重新渲染，
     导航和页脚不会重建，这就是 SPA（单页应用）的体验优势
     ============================================================ -->
<template>
  <div class="app">
    <NavBar />
    <!-- main 用 flex 布局撑起剩余高度，保证页脚始终贴底 -->
    <main class="main">
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<style scoped>
.app {
  /* Flex 纵向布局：导航在上、内容自适应撑开、页脚在下 */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 32px 0 60px;
}
</style>
