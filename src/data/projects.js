// ============================================================
// 项目作品数据模块
// 数据结构：
//   id      - 唯一标识
//   name    - 项目名称
//   period  - 时间
//   status  - 状态标签（进行中 / 已上线 等）
//   desc    - 项目简介
//   techs   - 技术栈标签（数组）
//   points  - 项目亮点 / 个人收获（数组），面试主要讲这些
//   link    - 在线地址（可选）
//   repo    - 源码仓库地址（可选）
// 新增项目：在 projects 数组最前面追加
// ============================================================

export const projects = [
  {
    id: 1,
    name: '个人博客（本站）',
    period: '2026.08',
    status: '已上线',
    desc: '从零独立开发的个人求职作品集网站，包含首页、学习笔记、项目展示、关于我等页面，已上线，持续更新中。',
    techs: ['Vue3', 'Vite', 'Vue Router 4', '原生 CSS', 'GitHub Actions'],
    points: [
      '独立完成从设计、开发到部署上线的完整流程',
      '学习笔记、项目等内容统一放在独立的数据文件中管理，页面只负责展示，更新内容无需改动页面代码',
      '配置 GitHub Actions 自动部署，push 代码即可自动构建上线，并同时发布到 GitHub Pages 与 Vercel 两个平台',
      '使用 CSS 变量统一管理主题配色，结合 Flex 布局实现响应式页面，适配不同屏幕尺寸'
    ],
    link: 'https://rainbow-713.github.io/huangwenhong-blog/',
    repo: 'https://github.com/rainbow-713/huangwenhong-blog'
  }
]
