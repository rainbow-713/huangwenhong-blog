# 代码风格规范（Code Style）

## 一、Vue 组件规范
1. 所有组件统一使用 `<script setup>` 语法（Composition API），不使用 Options API
2. 单文件组件内部顺序固定：`<template>` → `<script setup>` → `<style scoped>`
3. 组件必须加 `scoped` 样式，避免全局污染；只有 `styles/global.css` 允许写全局样式
4. 组件接收数据必须用 `defineProps` 声明类型和默认值，不直接在子组件里改 props

## 二、命名规范
| 对象 | 规则 | 示例 |
|------|------|------|
| 组件文件名 | PascalCase | `NavBar.vue`、`NoteCard.vue` |
| 页面组件 | `XxxView.vue` 后缀 | `HomeView.vue`、`NotesView.vue` |
| JS/数据文件 | camelCase | `notes.js`、`profile.js` |
| 变量、函数 | camelCase | `noteList`、`getNoteById` |
| 常量 | UPPER_SNAKE_CASE | `SITE_NAME` |
| CSS 类名 | kebab-case | `note-card`、`site-header` |
| 路由 name | PascalCase | `NoteDetail` |

## 三、样式规范
1. 主题色、字号、圆角等统一使用 `styles/global.css` 中定义的 CSS 变量，禁止硬编码颜色值
2. 移动端适配统一使用媒体查询断点：`768px`（平板/手机分界）
3. 布局优先使用 Flexbox；不使用 float 布局

## 四、注释规范
1. 代码注释使用中文，解释"为什么"而不只是"做了什么"
2. 关键知识点处补充原理说明（本项目同时是学习载体）
3. 每个数据模块文件头部说明数据结构定义

## 五、数据层规范
1. 所有页面内容数据集中在 `src/data/` 目录，视图组件不内嵌大段文案
2. 新增笔记/面试题时只在对应数据文件追加，不修改组件逻辑
3. 每条数据必须包含完整字段（参考文件头部的结构说明），不允许留空占位

## 六、禁止事项
- 禁止引入 UI 组件库（ElementPlus 等）与 CSS 框架（Tailwind 等），手写样式是本项目要求
- 禁止使用 `var` 声明变量，统一 `const` / `let`
- 禁止在组件里直接写死会变的文案（如联系方式），一律走 `src/data/profile.js`
