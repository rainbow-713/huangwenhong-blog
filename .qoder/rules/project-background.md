# 项目背景（Project Background）

## 项目定位
- 项目名称：黄雯宏的个人博客（huangwenhong-blog）
- 项目性质：纯静态个人博客（无后端、无数据库），是博主求职前端岗位的**作品集项目**
- 博主：黄雯宏，厦门软件职业技术学院 计算机网络技术专业在读，正在系统学习前端开发
- 核心目标：
  1. 上线可访问，面试时可直接展示给面试官
  2. 代码体现 Vue3 实战能力（组件化、路由、Composition API），弥补无工作经验的短板
  3. 长期沉淀学习笔记与模拟面试记录，作为求职冲刺的个人档案

## 技术栈（严格限定，新增依赖需先说明理由）
- Vue 3：统一使用 Composition API + `<script setup>` 语法
- Vite：构建工具
- Vue Router 4：history 模式
- 样式：手写原生 CSS + CSS 变量，不引入 UI 组件库（为了体现 CSS 基本功）
- 数据：`src/data/` 下的本地 JS 模块，不引入后端与数据库
- 部署：码云（Gitee）托管代码 + Vercel 线上部署

## 目录结构约定
```
huangwenhong-blog/
├── index.html              # 应用入口 HTML
├── vite.config.js          # Vite 配置
├── vercel.json             # Vercel 部署配置（history 路由重写）
├── docs/
│   └── interview-prep/     # 模拟面试复盘记录（Markdown 档案）
└── src/
    ├── main.js             # 应用入口：创建实例、注册路由、挂载
    ├── App.vue             # 根组件：布局框架（导航 + 路由出口 + 页脚）
    ├── router/index.js     # 路由表：所有页面路由集中定义
    ├── components/         # 可复用组件（NavBar、FooterBar、各类卡片）
    ├── views/              # 页面级组件，与路由一一对应
    ├── data/               # 静态数据模块（个人资料/笔记/项目/面试题）
    └── styles/global.css   # 全局样式：CSS 变量、reset、通用类
```

## 页面清单（路由表）
| 路径 | 页面 | 数据来源 |
|------|------|----------|
| `/` | 首页：个人简介 + 最新笔记 | profile.js / notes.js |
| `/about` | 关于我：数字化简历 + 学习路线时间轴 | profile.js |
| `/notes` | 学习笔记列表 | notes.js |
| `/notes/:id` | 笔记详情 | notes.js |
| `/projects` | 项目展示 | projects.js |
| `/interview` | 面试准备题库 | interview.js |
| `/:pathMatch(.*)*` | 404 兜底页 | - |

## 长期迭代机制
- 每次新增学习笔记：在 `src/data/notes.js` 追加条目
- 每次模拟面试：问答记录追加到 `src/data/interview.js`，复盘文档写入 `docs/interview-prep/`
- 每次迭代完成后：遵循 commit-convention 规范提交，保持提交历史清晰可讲

## 内容红线
- 手机号等隐私信息不写入网站，联系方式只保留邮箱（1458457644@qq.com）
- 笔记内容必须是真实学习产出，不堆砌空洞文字
