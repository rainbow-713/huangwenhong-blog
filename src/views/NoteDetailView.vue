<!-- ============================================================
     笔记详情页（动态路由 /notes/:id）
     面试知识点：
     1. 通过 useRoute() 取动态参数，在数据里查找对应笔记
     2. 用 computed 派生"当前笔记"，路由参数变化会自动重新计算
     3. 找不到笔记时渲染兜底提示（健壮性处理）
     ============================================================ -->
<template>
  <div class="container detail">
    <!-- 笔记存在时渲染正文 -->
    <article v-if="note" class="card article">
      <header class="article-head">
        <h1 class="article-title">{{ note.title }}</h1>
        <div class="article-meta">
          <span>{{ note.date }}</span>
          <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <!-- 按小节遍历渲染：标题 + 段落 + 可选代码块 -->
      <section v-for="(sec, i) in note.sections" :key="i" class="article-section">
        <h2 class="article-subtitle">{{ sec.heading }}</h2>
        <p v-for="(p, j) in sec.paragraphs" :key="j" class="article-p">{{ p }}</p>
        <!-- pre 保留代码格式，空格与换行原样展示 -->
        <pre v-if="sec.code" class="article-code"><code>{{ sec.code.text }}</code></pre>
      </section>

      <router-link to="/notes" class="back-link">← 返回笔记列表</router-link>
    </article>

    <!-- 兜底：链接里的 id 不存在时 -->
    <div v-else class="empty card">
      <p>没有找到这篇笔记</p>
      <router-link to="/notes" class="back-link">← 返回笔记列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getNoteById } from '../data/notes.js'

const route = useRoute()

// 计算属性：根据路由参数找笔记
// 注意：在 /notes/1 和 /notes/2 之间切换时，组件会被复用而不是销毁重建，
// 所以必须用响应式手段（computed）重新查找，而不是在 onMounted 里查一次就结束
const note = computed(() => getNoteById(route.params.id))
</script>

<style scoped>
.detail {
  max-width: 800px;
}

.article {
  padding: 36px 40px;
}

.article-title {
  font-size: 26px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-text-2);
}

.article-section {
  margin-top: 30px;
}

.article-subtitle {
  font-size: 19px;
  margin-bottom: 12px;
}

.article-p {
  margin-top: 10px;
  font-size: 15px;
  color: var(--color-text);
}

/* 代码块：深色背景 + 等宽字体 + 横向滚动 */
.article-code {
  margin-top: 14px;
  padding: 16px 18px;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  font-family: 'JetBrains Mono', Consolas, Menlo, monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}

.back-link {
  display: inline-block;
  margin-top: 32px;
  color: var(--color-primary);
  font-size: 14px;
}

.empty {
  padding: 60px 24px;
  text-align: center;
  color: var(--color-text-2);
}

.empty .back-link {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .article {
    padding: 24px 20px;
  }

  .article-title {
    font-size: 21px;
  }
}
</style>
