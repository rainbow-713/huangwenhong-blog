<!-- ============================================================
     关于我：数字化简历页
     内容分区块：教育背景 / 学习路线 / 校园经历 / 获奖 / 证书 / 自我评价
     所有文案来自 src/data/profile.js
     ============================================================ -->
<template>
  <div class="container about">
    <h2 class="section-title">关于我</h2>

    <!-- 教育背景 -->
    <section class="card block">
      <h3 class="block-title">教育背景</h3>
      <div class="edu-row">
        <span class="edu-period">{{ education.period }}</span>
        <div>
          <p class="edu-school">{{ education.school }} · {{ education.major }}</p>
          <ul class="edu-highlights">
            <li v-for="(h, i) in education.highlights" :key="i">{{ h }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 前端学习路线：时间轴布局 -->
    <section class="card block">
      <h3 class="block-title">前端学习路线</h3>
      <div class="timeline">
        <div v-for="(step, i) in learningTimeline" :key="i" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-body">
            <p class="timeline-time">{{ step.time }}</p>
            <p class="timeline-title">{{ step.title }}</p>
            <p class="timeline-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 校园经历 -->
    <section class="card block">
      <h3 class="block-title">校园经历</h3>
      <div v-for="(exp, i) in experiences" :key="i" class="exp-item">
        <p class="exp-head">
          <span class="exp-title">{{ exp.title }}</span>
          <span class="exp-period">{{ exp.period }}</span>
        </p>
        <ul class="exp-list">
          <li v-for="(item, j) in exp.items" :key="j">{{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- 获奖记录 + 证书：两列并排，移动端变单列 -->
    <div class="two-col">
      <section class="card block">
        <h3 class="block-title">获奖记录</h3>
        <ul class="award-list">
          <li v-for="(award, i) in awards" :key="i">
            <span class="award-year">{{ award.year }}</span>
            <div>
              <p class="award-title">{{ award.title }}</p>
              <p class="award-desc">{{ award.desc }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="card block">
        <h3 class="block-title">技能证书</h3>
        <ul class="cert-list">
          <li v-for="(cert, i) in certificates" :key="i">
            <p class="cert-name">{{ cert.name }}</p>
            <p class="cert-desc">{{ cert.desc }}</p>
          </li>
        </ul>
      </section>
    </div>

    <!-- 自我评价 -->
    <section class="card block">
      <h3 class="block-title">自我评价</h3>
      <ul class="eval-list">
        <li v-for="(e, i) in evaluation" :key="i">{{ e }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import {
  education,
  learningTimeline,
  experiences,
  awards,
  certificates,
  evaluation
} from '../data/profile.js'
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.block {
  padding: 28px 32px;
}

.block-title {
  font-size: 18px;
  margin-bottom: 18px;
  color: var(--color-primary);
}

.edu-row {
  display: flex;
  gap: 24px;
}

.edu-period {
  flex-shrink: 0;
  font-size: 14px;
  color: var(--color-text-2);
}

.edu-school {
  font-weight: 600;
  font-size: 16px;
}

.edu-highlights li,
.exp-list li,
.eval-list li {
  position: relative;
  padding-left: 16px;
  margin-top: 8px;
  font-size: 14px;
  color: var(--color-text-2);
}

/* 列表小圆点 */
.edu-highlights li::before,
.exp-list li::before,
.eval-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

/* 时间轴 */
.timeline {
  position: relative;
  padding-left: 24px;
}

/* 竖线 */
.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-bottom: 22px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -24px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid var(--color-primary-light);
}

.timeline-time {
  font-size: 12px;
  color: var(--color-text-2);
}

.timeline-title {
  font-weight: 600;
  margin: 2px 0;
}

.timeline-desc {
  font-size: 14px;
  color: var(--color-text-2);
}

.exp-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.exp-title {
  font-weight: 600;
}

.exp-period {
  font-size: 13px;
  color: var(--color-text-2);
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.award-list li {
  display: flex;
  gap: 14px;
  margin-top: 12px;
}

.award-list li:first-child {
  margin-top: 0;
}

.award-year {
  flex-shrink: 0;
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 600;
}

.award-title {
  font-size: 14px;
  font-weight: 600;
}

.award-desc {
  font-size: 13px;
  color: var(--color-text-2);
}

.cert-list li {
  margin-top: 12px;
}

.cert-list li:first-child {
  margin-top: 0;
}

.cert-name {
  font-size: 14px;
  font-weight: 600;
}

.cert-desc {
  font-size: 13px;
  color: var(--color-text-2);
}

@media (max-width: 768px) {
  .block {
    padding: 22px 20px;
  }

  .edu-row {
    flex-direction: column;
    gap: 8px;
  }

  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
