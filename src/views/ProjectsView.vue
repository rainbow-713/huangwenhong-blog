<!-- ============================================================
     项目展示页：作品卡片列表
     每个项目重点写"技术栈 + 亮点收获"，这是面试官最想深挖的部分
     ============================================================ -->
<template>
  <div class="container">
    <h2 class="section-title">项目展示</h2>
    <p class="page-desc">每一个项目都是一次完整的学习闭环：从规划、开发到部署复盘。</p>

    <div class="project-list">
      <article v-for="project in projects" :key="project.id" class="card project-card">
        <header class="project-head">
          <h3 class="project-name">{{ project.name }}</h3>
          <span class="tag project-status">{{ project.status }}</span>
        </header>
        <p class="project-period">{{ project.period }}</p>
        <p class="project-desc">{{ project.desc }}</p>

        <div class="project-techs">
          <span v-for="tech in project.techs" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>

        <div class="project-points">
          <p class="points-title">项目亮点 / 收获</p>
          <ul>
            <li v-for="(point, i) in project.points" :key="i">{{ point }}</li>
          </ul>
        </div>
      </article>
    </div>

    <p class="hint">更多项目正在路上：每学完一个知识模块，就会落地一个小作品到这里。</p>
  </div>
</template>

<script setup>
import { projects } from '../data/projects.js'
</script>

<style scoped>
.page-desc {
  margin: -8px 0 28px;
  font-size: 14px;
  color: var(--color-text-2);
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.project-card {
  padding: 28px 32px;
}

.project-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.project-name {
  font-size: 20px;
}

.project-status {
  background: #ecfdf5;
  color: #059669;
}

.project-period {
  margin-top: 4px;
  font-size: 13px;
  color: var(--color-text-2);
}

.project-desc {
  margin-top: 12px;
  font-size: 14px;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tech-tag {
  padding: 3px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.project-points {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
}

.points-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.project-points li {
  position: relative;
  padding-left: 16px;
  margin-top: 6px;
  font-size: 14px;
  color: var(--color-text-2);
}

.project-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

.hint {
  margin-top: 28px;
  font-size: 13px;
  color: var(--color-text-2);
  text-align: center;
}

@media (max-width: 768px) {
  .project-card {
    padding: 22px 20px;
  }
}
</style>
