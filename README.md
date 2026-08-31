# 黄雯宏的个人博客

一个纯静态的个人博客与求职作品集，记录前端学习之路与面试冲刺全过程。

在线访问：[https://rainbow-713.github.io/huangwenhong-blog/](https://rainbow-713.github.io/huangwenhong-blog/)（GitHub Pages，国内可访问）

备用地址：[https://huangwenhong-blog.vercel.app](https://huangwenhong-blog.vercel.app)（Vercel，海外网络可访问）

源码仓库：[GitHub](https://github.com/rainbow-713/huangwenhong-blog) · [Gitee](https://gitee.com/little-rainbow0713/huangwenhong-blog)

## 项目定位

- 求职前端岗位的**作品集项目**：代码体现 Vue3 实战能力，页面内容展示个人经历与学习产出
- **学习沉淀平台**：学习笔记持续更新，能讲清楚的才是真正学会的
- **面试冲刺档案**：内置前端面试题库，每次模拟面试的问答记录持续沉淀

## 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | Vue 3 | 全部使用 Composition API + `<script setup>` |
| 构建 | Vite 6 | 快速冷启动、按路由分包 |
| 路由 | Vue Router 4 | history 模式 + 路由懒加载 |
| 样式 | 原生 CSS | CSS 变量主题、Flex/Grid 布局、手写响应式 |
| 数据 | 本地 JS 模块 | 数据与视图分离，纯静态无后端 |
| 部署 | Vercel | 配置 history 路由重写（见 `vercel.json`） |

## 页面结构

| 路由 | 页面 |
|------|------|
| `/` | 首页：个人简介 + 最新笔记 |
| `/about` | 关于我：数字化简历 + 前端学习路线时间轴 |
| `/notes` `/notes/:id` | 学习笔记列表与详情 |
| `/projects` | 项目展示 |
| `/interview` | 面试准备题库（点击展开参考答案） |

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 5173 端口）
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

## 目录结构

```
├── .qoder/rules/          # 项目规范（背景 / 代码风格 / 提交规范）
├── docs/interview-prep/   # 模拟面试复盘档案
└── src/
    ├── main.js            # 应用入口
    ├── App.vue            # 布局框架（导航 + 路由出口 + 页脚）
    ├── router/            # 路由表
    ├── components/        # 可复用组件
    ├── views/             # 页面组件
    ├── data/              # 内容数据（资料/笔记/项目/题库）
    └── styles/            # 全局样式
```

## 如何持续更新内容

- 新增学习笔记：在 `src/data/notes.js` 顶部追加一条
- 新增面试题：在 `src/data/interview.js` 追加，模拟面试复盘写入 `docs/interview-prep/`
- 更新个人资料：只改 `src/data/profile.js`，全站自动同步

## 联系方式

邮箱：1458457644@qq.com
