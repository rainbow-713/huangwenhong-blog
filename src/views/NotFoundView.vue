<!-- 404 兜底页：访问不存在的路径时展示 -->
<template>
  <div class="container not-found">
    <p class="code">404</p>
    <p class="text">你访问的页面不存在，可能链接有误或已被移动。</p>
    <router-link to="/" class="back-btn">回到首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}

.code {
  font-size: 72px;
  font-weight: 800;
  color: var(--color-primary);
}

.text {
  margin: 12px 0 28px;
  color: var(--color-text-2);
}

.back-btn {
  display: inline-block;
  padding: 10px 26px;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
}

.back-btn:hover {
  background: var(--color-primary-dark);
}
</style>
