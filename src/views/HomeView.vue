<!-- ============================================================
     首页：个人简介卡 + 最新学习笔记
     设计目标：面试官打开 3 秒内知道你是谁、在学什么、有什么产出
     ============================================================ -->
<template>
  <div class="container">
    <!-- 首屏：个人简介卡 -->
    <section class="hero card">
      <div class="hero-avatar">{{ profile.avatarText }}</div>
      <div class="hero-body">
        <h1 class="hero-name">
          {{ profile.name }}
          <span class="hero-title">{{ profile.title }}</span>
        </h1>
        <p class="hero-slogan">{{ profile.slogan }}</p>
        <p class="hero-location">{{ profile.location }}</p>
        <!-- 技术标签：数据来自 profile.js，学习新技能后更新数据即可 -->
        <div class="hero-skills">
          <span v-for="skill in profile.skills" :key="skill" class="tag">{{ skill }}</span>
        </div>
        <p class="hero-learning">{{ profile.learning }}</p>
        <div class="hero-actions">
          <router-link to="/about" class="btn btn-primary">了1111解我 →</router-link>
          <router-link to="/notes" class="btn btn-ghost">学习笔记</router-link>
        </div>
      </div>
    </section>

    <!-- 最新笔记：取数组前 3 条（数据按时间倒序存放） -->
    <section class="latest">
      <div class="latest-head">
        <h2 class="section-title">最新学习笔记</h2>
        <router-link to="/notes" class="more-link">查看全部 →</router-link>
      </div>
      <div class="note-grid">
        <NoteCard v-for="note in latestNotes" :key="note.id" :note="note" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { profile } from '../data/profile.js'
import { notes } from '../data/notes.js'
import NoteCard from '../components/NoteCard.vue'

// 计算属性：取最新 3 篇笔记
// 面试知识点：computed 有缓存，依赖（notes）不变就不会重新计算
const latestNotes = computed(() => notes.slice(0, 3))
</script>

<style scoped>
.hero {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 40px;
  margin-bottom: 48px;
}

.hero-avatar {
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #fff;
  /* 渐变头像占位：之后可替换为真实照片 */
  background: linear-gradient(135deg, var(--color-primary), #7c3aed);
}

.hero-name {
  font-size: 28px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-primary);
  background: var(--color-primary-light);
  padding: 2px 12px;
  border-radius: 999px;
}

.hero-slogan {
  margin-top: 10px;
  font-size: 16px;
  color: var(--color-text);
}

.hero-location {
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-text-2);
}

.hero-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.hero-learning {
  margin-top: 14px;
  font-size: 14px;
  color: var(--color-text-2);
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 22px;
}

.btn {
  display: inline-block;
  padding: 9px 22px;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
}

.btn-ghost {
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn-ghost:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.latest-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.latest-head .section-title {
  margin-bottom: 0;
}

.more-link {
  font-size: 14px;
  color: var(--color-primary);
}

/* 笔记网格：大屏三列，窄屏自动降列数 */
.note-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .note-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 32px 24px;
  }

  .hero-name {
    justify-content: center;
  }

  .hero-skills {
    justify-content: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .note-grid {
    grid-template-columns: 1fr;
  }
}
</style>
