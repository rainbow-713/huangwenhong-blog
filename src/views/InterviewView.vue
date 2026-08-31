<!-- ============================================================
     面试准备页：前端面试题库
     交互设计：先自己回答，再点开参考答案对照——模拟真实面试
     面试知识点：本页用 ref 数组记录"已展开的题目 id"，
     是 v-if 列表条件渲染的典型应用场景
     ============================================================ -->
<template>
  <div class="container">
    <h2 class="section-title">面试准备</h2>
    <p class="page-desc">
      我的面试冲刺题库：覆盖高频考点，每题都带答题要点与参考答案。
      每次模拟面试的新题与复盘也会持续沉淀到这里。
      <strong>使用建议：先盖住答案自己讲一遍，再点开对照。</strong>
    </p>

    <!-- 按分类分组渲染 -->
    <section v-for="cat in categories" :key="cat" class="qa-group">
      <h3 class="qa-category">
        {{ cat }}
        <span class="qa-count">{{ countByCategory(cat) }} 题</span>
      </h3>

      <div
        v-for="q in questionsByCategory(cat)"
        :key="q.id"
        class="card qa-item"
      >
        <button class="qa-question" @click="toggle(q.id)">
          <span class="qa-icon">{{ opened.includes(q.id) ? '−' : '+' }}</span>
          <span>{{ q.question }}</span>
        </button>

        <!-- 展开区：答题要点 + 参考答案 + 来源 -->
        <div v-if="opened.includes(q.id)" class="qa-answer">
          <p class="answer-label">答题要点</p>
          <ul class="answer-points">
            <li v-for="(point, i) in q.keyPoints" :key="i">{{ point }}</li>
          </ul>
          <p class="answer-label">参考答案示例</p>
          <p class="answer-demo">{{ q.answerDemo }}</p>
          <p class="answer-source">来源：{{ q.source }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { interviewQuestions, categories } from '../data/interview.js'

// 已展开的题目 id 列表（点击切换）
const opened = ref([])

// 切换某题的展开状态
// 面试知识点：数组的 includes 判断、展开运算符生成新数组（保持响应式）
function toggle(id) {
  if (opened.value.includes(id)) {
    opened.value = opened.value.filter((i) => i !== id)
  } else {
    opened.value = [...opened.value, id]
  }
}

// 取某分类下的题目
function questionsByCategory(cat) {
  return interviewQuestions.filter((q) => q.category === cat)
}

// 某分类的题目数量
function countByCategory(cat) {
  return questionsByCategory(cat).length
}
</script>

<style scoped>
.page-desc {
  margin: -8px 0 32px;
  font-size: 14px;
  color: var(--color-text-2);
  max-width: 720px;
}

.qa-group {
  margin-bottom: 36px;
}

.qa-category {
  font-size: 18px;
  margin-bottom: 14px;
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.qa-count {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-2);
}

.qa-item {
  margin-bottom: 12px;
  overflow: hidden;
}

.qa-question {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 20px;
  border: none;
  background: none;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
}

.qa-question:hover {
  color: var(--color-primary);
}

.qa-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 16px;
  color: var(--color-primary);
  background: var(--color-primary-light);
}

.qa-answer {
  padding: 0 20px 18px 54px;
}

.answer-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.answer-points li {
  position: relative;
  padding-left: 14px;
  margin-top: 4px;
  font-size: 14px;
  color: var(--color-text-2);
}

.answer-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-primary);
}

.answer-demo {
  font-size: 14px;
  color: var(--color-text);
  background: var(--color-bg);
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 10px;
}

.answer-source {
  font-size: 12px;
  color: var(--color-text-2);
}

@media (max-width: 768px) {
  .qa-answer {
    padding-left: 20px;
  }
}
</style>
