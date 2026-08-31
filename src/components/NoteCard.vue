<!-- ============================================================
     笔记卡片组件（可复用）
     面试知识点：这是典型的"展示型组件"——只负责渲染，
     数据完全由父组件通过 props 传入，自身不关心数据从哪来，
     这样的组件才能在列表页、首页等多个地方复用
     ============================================================ -->
<template>
  <router-link :to="`/notes/${note.id}`" class="card note-card">
    <div class="note-meta">
      <span class="note-date">{{ note.date }}</span>
      <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <h3 class="note-title">{{ note.title }}</h3>
    <p class="note-summary">{{ note.summary }}</p>
    <span class="read-more">阅读全文 →</span>
  </router-link>
</template>

<script setup>
// defineProps 是编译器宏，无需导入；声明类型便于校验与阅读
defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.note-card {
  display: block;
  padding: 22px 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.note-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.note-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.note-date {
  font-size: 13px;
  color: var(--color-text-2);
}

.note-title {
  font-size: 18px;
  margin-bottom: 8px;
}

.note-card:hover .note-title {
  color: var(--color-primary);
}

.note-summary {
  font-size: 14px;
  color: var(--color-text-2);
  /* 两行超出省略：常见文本截断技巧 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.read-more {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-primary);
}
</style>
