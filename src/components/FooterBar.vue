<!-- ============================================================
     页脚组件：版权信息 + 联系方式
     联系方式从 profile.js 取，不在组件里写死（代码规范要求）
     ============================================================ -->
<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© 2026 {{ profile.name }} · 一个正在成长的前端学习者</p>
      <p>
        联系我：
        <a :href="`mailto:${profile.email}`" class="footer-link">{{ profile.email }}</a>
        ·
        <a href="https://gitee.com/little-rainbow0713" target="_blank" rel="noopener" class="footer-link">
          Gitee 主页
        </a>
      </p>
      <p class="footer-tech">本站由 Vue3 + Vite 构建 · 部署于 GitHub Pages / Vercel</p>
    </div>
  </footer>
</template>

<script setup>
import { profile } from '../data/profile.js'
</script>

<style scoped>
.site-footer {
  padding: 28px 0;
  border-top: 1px solid var(--color-border);
  background: #fff;
  font-size: 13px;
  color: var(--color-text-2);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}

.footer-link {
  color: var(--color-primary);
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-tech {
  font-size: 12px;
  opacity: 0.8;
}
</style>
