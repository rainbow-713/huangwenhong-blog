<!-- ============================================================
     学习笔记列表页
     直接遍历 notes 数据渲染卡片，新增笔记只需改数据文件
     ============================================================ -->
<template>
  <div class="container">
    <h2 class="section-title">学习笔记</h2>
    <p class="page-desc">
      这里记录我学习前端的每一步思考。写笔记是我消化知识的方式——能讲清楚的才是真正学会的。
    </p>

    <div class="note-list">
      <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script setup>
import { notes } from '../data/notes.js'
import NoteCard from '../components/NoteCard.vue'
</script>

<style scoped>
.page-desc {
  margin: -8px 0 28px;
  font-size: 14px;
  color: var(--color-text-2);
}

.note-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 800px;
}
</style>
