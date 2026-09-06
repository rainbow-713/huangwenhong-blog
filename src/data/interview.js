// ============================================================
// 面试题库数据模块（本模块随每次模拟面试持续追加）
// 数据结构：
//   id         - 唯一标识
//   category   - 分类（HTML/CSS、JavaScript、Vue、工程化与网络、项目与综合）
//   question   - 题目
//   keyPoints  - 答题要点（数组）
//   answerDemo - 参考答案示例
//   source     - 来源（'内置题库' 或 '模拟面试 YYYY-MM-DD'）
// 新增题目：直接追加到对应分类的位置即可
// ============================================================

export const interviewQuestions = [
  // ---------- HTML / CSS ----------
  {
    id: 1,
    category: 'HTML/CSS',
    question: '说说你对盒模型的理解，box-sizing 有什么作用？',
    keyPoints: [
      '盒模型 = content + padding + border + margin',
      '默认 content-box：width 只算内容区，加 padding 会撑大元素',
      'border-box：width 包含 padding 和 border，布局更好算',
      '项目实践：全局 reset 时统一设置 box-sizing: border-box'
    ],
    answerDemo: '盒模型描述元素占据空间的组成：内容、内边距、边框、外边距。默认是 content-box，设置的 width 只是内容宽度，加了 padding 元素会变大，布局计算很麻烦。所以实际项目会在全局设置 box-sizing: border-box，让 width 直接等于元素最终宽度。我的博客全局样式里就是这么做的。',
    source: '内置题库'
  },
  {
    id: 2,
    category: 'HTML/CSS',
    question: 'Flex 布局常用属性有哪些？怎么实现垂直水平居中？',
    keyPoints: [
      '容器：display: flex; justify-content 控制主轴；align-items 控制交叉轴',
      '项目：flex: 1 让元素填充剩余空间',
      '居中：display: flex; justify-content: center; align-items: center',
      '能说出 flex-direction 改变主轴方向'
    ],
    answerDemo: 'Flex 是一维布局模型。容器上 display: flex 开启，justify-content 管主轴对齐，align-items 管交叉轴对齐，垂直水平居中就是两个都设为 center。我的博客整站布局就是用 flex 纵向排列：导航、内容区、页脚，内容区 flex: 1 撑开剩余高度保证页脚贴底。',
    source: '内置题库'
  },
  {
    id: 3,
    category: 'HTML/CSS',
    question: '如何实现移动端适配？',
    keyPoints: [
      'viewport meta 标签的作用',
      '媒体查询 @media 按断点调整样式',
      '相对单位与百分比布局',
      '移动优先的设计思路'
    ],
    answerDemo: '首先用 viewport meta 让页面按设备宽度渲染，然后用媒体查询在不同断点下调整布局，比如 768px 以下把多列变单列、缩小字号。我的博客就是用 768px 一个断点做的响应式，导航在移动端也会简化。',
    source: '内置题库'
  },

  // ---------- JavaScript ----------
  {
    id: 4,
    category: 'JavaScript',
    question: 'var、let、const 的区别？',
    keyPoints: [
      'var 函数作用域、有变量提升、可重复声明',
      'let/const 块级作用域、无提升（暂时性死区）',
      'const 声明后不能重新赋值（对象属性仍可改）',
      '实际规范：默认用 const，需要重新赋值用 let，禁用 var'
    ],
    answerDemo: 'var 是函数作用域且有变量提升，容易造成意外覆盖；let 和 const 是块级作用域。const 表示绑定不可变，但如果是对象，内部属性仍可修改。我们项目开发规范是优先 const、需要变更才用 let、不用 var。',
    source: '内置题库'
  },
  {
    id: 5,
    category: 'JavaScript',
    question: '箭头函数和普通函数有什么区别？',
    keyPoints: [
      '箭头函数没有自己的 this，继承定义时所在作用域的 this',
      '不能用作构造函数（不能 new）',
      '没有 arguments 对象',
      '适合回调场景，不适合对象方法'
    ],
    answerDemo: '最大区别是 this 指向：普通函数的 this 看调用方式，箭头函数没有自己的 this，直接继承外层作用域的。所以箭头函数很适合做回调，不用担心 this 丢失；但不能用来 new 对象。',
    source: '内置题库'
  },
  {
    id: 6,
    category: 'JavaScript',
    question: '说说你对 Promise 的理解？',
    keyPoints: [
      '解决回调地狱，表示异步操作的最终结果',
      '三种状态：pending / fulfilled / rejected，状态不可逆',
      'then 链式调用，每个 then 返回新 Promise',
      '常见衍生：Promise.all、async/await 是语法糖'
    ],
    answerDemo: 'Promise 是一个表示异步操作最终结果的对象，有 pending、fulfilled、rejected 三种状态，状态一旦确定就不能再变。它支持 then 链式调用，把嵌套回调变成链式写法。async/await 本质是 Promise 的语法糖，让异步代码看起来像同步代码。',
    source: '内置题库'
  },
  {
    id: 7,
    category: 'JavaScript',
    question: '深拷贝和浅拷贝的区别？',
    keyPoints: [
      '浅拷贝只复制第一层，嵌套对象仍共享引用',
      '深拷贝递归复制所有层级',
      '浅拷贝方法：Object.assign、展开运算符',
      '深拷贝：JSON 序列化（有局限）或手写递归'
    ],
    answerDemo: '浅拷贝只复制对象第一层属性，嵌套的对象还是同一个引用，改一边另一边也变；深拷贝是完整复制一份独立数据。展开运算符是浅拷贝，JSON.parse(JSON.stringify()) 可以做深拷贝但无法处理函数和 undefined 等。',
    source: '内置题库'
  },
  {
    id: 21,
    category: 'JavaScript',
    question: '== 和 === 的区别？',
    keyPoints: [
      '== 比较前会做类型转换（隐式转换）',
      '=== 类型和值都要求相等，不转换',
      '经典例：0 == "" 为 true，0 === "" 为 false',
      '规范：一律用 ===，避免隐式转换的坑'
    ],
    answerDemo: '== 会先做类型转换再比较，比如 0 == "" 是 true，容易出隐藏 bug；=== 是严格相等，类型不同直接 false。实际开发规范是一律用 ===，需要类型转换时自己显式转。',
    source: '面试准备 2026-09-06'
  },
  {
    id: 22,
    category: 'JavaScript',
    question: '什么是闭包？有什么用？',
    keyPoints: [
      '函数 + 它能访问的外部变量，组合成一个封闭环境',
      '典型形态：外层函数返回内层函数，内层用了外层的变量',
      '用途：私有变量、防抖节流的 timer、计数器',
      '注意：滥用可能导致内存占用不释放'
    ],
    answerDemo: '闭包就是函数可以记住并访问它定义时所在作用域的变量，哪怕函数在外面被调用了。典型写法是外层函数返回一个内层函数，内层用了外层的变量。实际用途很多，比如防抖函数里存的 timer 变量就是靠闭包保住的，每次调用防抖后的函数都能访问到同一个 timer。',
    source: '面试准备 2026-09-06'
  },

  // ---------- Vue ----------
  {
    id: 8,
    category: 'Vue',
    question: 'Vue3 的响应式原理是什么？和 Vue2 有什么区别？',
    keyPoints: [
      'Vue3 用 Proxy 代理整个对象，Vue2 用 defineProperty 逐属性劫持',
      'Proxy 能拦截新增/删除/数组下标，性能更好',
      '依赖收集与触发更新的流程',
      '能结合自己笔记讲（博客有对应笔记更好）'
    ],
    answerDemo: 'Vue3 用 Proxy 劫持数据：渲染时访问了哪些数据就收集为依赖，数据变化时通知依赖更新。相比 Vue2 的 defineProperty，Proxy 直接代理整个对象，能检测属性新增删除和数组下标变化，也不用递归遍历所有属性初始化。我在博客里专门写过一篇笔记总结这个原理。',
    source: '内置题库'
  },
  {
    id: 9,
    category: 'Vue',
    question: 'ref 和 reactive 的区别？怎么选择？',
    keyPoints: [
      'ref 可包装任意类型，访问要 .value；reactive 只代理对象',
      '解构 reactive 会丢失响应式',
      '模板中 ref 自动解包',
      '选择原则：组件内保持统一即可'
    ],
    answerDemo: 'ref 可以包装基本类型和对象，JS 中通过 .value 访问，模板里自动解包；reactive 只能用于对象，直接解构会丢失响应式。我的习惯是基本类型用 ref，表单等复杂对象用 reactive，一个组件内保持风格统一。',
    source: '内置题库'
  },
  {
    id: 10,
    category: 'Vue',
    question: '组件之间怎么通信？',
    keyPoints: [
      '父传子：props；子传父：emit 事件',
      '跨层级：provide / inject',
      '全局状态：Pinia / Vuex',
      '兄弟组件可通过共同父组件中转'
    ],
    answerDemo: '最常用的是 props 向下传数据、emit 向上发事件。跨多层组件可以用 provide/inject 避免层层透传。复杂的全局共享状态才引入 Pinia。我的博客是纯展示型项目，主要用 props 传数据，这也是我刻意练习的部分。',
    source: '内置题库'
  },
  {
    id: 11,
    category: 'Vue',
    question: 'v-if 和 v-show 的区别？',
    keyPoints: [
      'v-if 是真正销毁/重建元素，v-show 只是切换 display',
      'v-if 切换开销大但初始不渲染，v-show 初始就渲染',
      '频繁切换用 v-show，条件很少成立用 v-if'
    ],
    answerDemo: 'v-if 条件为假时元素根本不会渲染，切换时销毁重建；v-show 一直渲染，只是用 display 控制显隐。所以频繁切换的场景用 v-show 性能更好，几乎不可能出现的分支用 v-if 节省初始渲染。',
    source: '内置题库'
  },

  // ---------- 工程化与网络 ----------
  {
    id: 12,
    category: '工程化与网络',
    question: '从输入 URL 到页面显示发生了什么？',
    keyPoints: [
      'DNS 解析 → TCP 连接 → 发送 HTTP 请求 → 服务器响应',
      '浏览器解析 HTML 构建 DOM 树，CSS 构建 CSSOM，合成渲染树',
      '布局（Layout）计算位置，绘制（Paint）上屏',
      '加分项：缓存机制、SPA 与多页应用的区别'
    ],
    answerDemo: '先 DNS 解析域名拿到 IP，建立 TCP 连接后发送 HTTP 请求，服务器返回 HTML。浏览器解析 HTML 构建 DOM 树、CSS 构建样式树，合成渲染树后进行布局和绘制上屏。遇到 JS 会阻塞解析，所以脚本一般放在 body 底部或加 defer。我的博客用 Vite 打包后资源都做了按需加载，也是围绕这个流程做优化。',
    source: '内置题库'
  },
  {
    id: 13,
    category: '工程化与网络',
    question: 'Vite 为什么启动快？和 Webpack 的区别？',
    keyPoints: [
      '开发时不打包，基于浏览器原生 ES Module 按需编译',
      '冷启动只处理入口，访问到哪个模块才编译哪个',
      '生产环境用 Rollup 打包',
      'Webpack 是先整体打包再启动'
    ],
    answerDemo: 'Vite 开发时利用浏览器原生 ES Module，不做整体打包，服务启动几乎是瞬间的，访问哪个模块才即时编译哪个。而传统 Webpack 启动前要先把整个项目打包一遍，项目越大越慢。生产构建时 Vite 用 Rollup 输出优化后的产物。',
    source: '内置题库'
  },

  // ---------- 项目与综合 ----------
  {
    id: 14,
    category: '项目与综合',
    question: '介绍一下你的个人博客项目？',
    keyPoints: [
      '一句话定位：求职作品集 + 学习沉淀平台',
      '技术栈与选型理由',
      '遇到的难点及解决方式（history 路由 404、组件化设计）',
      '量化收获：独立完成全流程、规范意识'
    ],
    answerDemo: '这是我独立完成的前端作品集项目，用 Vue3 + Vite + Vue Router 开发，纯静态部署在 Vercel。它包含数字化简历、学习笔记、项目展示和面试题库四个模块。开发中我解决了 history 模式刷新 404 的问题，坚持手写 CSS 锻炼布局能力，并建立了自己的代码规范与提交规范。这个项目让我第一次走完了一个产品从规划到上线的完整流程。',
    source: '内置题库'
  },
  {
    id: 15,
    category: '项目与综合',
    question: '介绍一下你的个人博客项目？',
    keyPoints: [
      '定位：求职作品集网站，在线简历 + 学习记录，已上线',
      '五个页面：首页、关于我、学习笔记、项目展示、面试准备',
      '常规 Vue3 + Vite 写法，纯静态无后端，内容写在本地 JS 文件',
      '亮点在部署：GitHub Pages 主站 + Vercel 备用，自动部署'
    ],
    answerDemo: '这是我做的求职作品集网站，相当于在线简历加学习记录，有首页、关于我、学习笔记、项目展示、面试准备五个页面。技术上就是很常规的 Vue3 + Vite，页面切换用路由，内容写在本地 JS 文件里，纯静态不需要后端。它已经上线了，GitHub Pages 和 Vercel 各部署了一份，中间解决过刷新 404 和国内访问 GitHub 慢这些实际问题。',
    source: '面试准备 2026-09-06'
  },
  {
    id: 16,
    category: '项目与综合',
    question: '你的博客是怎么部署上线的？',
    keyPoints: [
      '代码托管在 Gitee 和 GitHub 双平台',
      'GitHub Actions 自动部署：push 到 main 自动打包发布到 Pages',
      'Vercel 部署备用地址，两边代码一样',
      '踩坑：国内访问 GitHub 慢用 hosts 加速；刷新 404 是静态单页应用经典问题'
    ],
    answerDemo: '代码托管在 Gitee 和 GitHub 上。GitHub 那边配了自动部署：推代码到 main 分支，GitHub Actions 就自动打包发布到 Pages，全程不用手动操作。另外在 Vercel 也部署了一份当备用地址。中间主要踩了两个坑：一个是国内访问 GitHub 很慢，配了 hosts 加速解决的；另一个是单页应用刷新会 404。',
    source: '面试准备 2026-09-06'
  },
  {
    id: 17,
    category: '项目与综合',
    question: '单页应用刷新 404 是怎么回事？怎么解决？',
    keyPoints: [
      'SPA 只有一个 index.html，深层路径只是前端路由在管理',
      '刷新时浏览器真的去服务器找这个文件，找不到就 404',
      'Vercel：配置重写规则，所有请求指回 index.html',
      'GitHub Pages：自定义 404 页面记住原地址跳回首页再还原'
    ],
    answerDemo: '单页应用其实只有一个 index.html，地址像 /notes/1 只是前端在管理。直接刷新时浏览器会去服务器找这个文件，找不到就 404。解决思路就是让服务器把请求都指回 index.html：Vercel 支持在配置里写重写规则；GitHub Pages 不支持，我用了个社区通用的办法——自定义一个 404 页面，先记住原地址，跳回首页再还原给前端路由。',
    source: '面试准备 2026-09-06'
  },
  {
    id: 18,
    category: '项目与综合',
    question: '博客的数据存在哪里？为什么不用后端？',
    keyPoints: [
      '数据写在本地 JS 文件中，数组导出，组件 import 使用',
      '更新内容：往数组加一条，重新部署',
      '纯展示内容没有用户交互和动态数据，静态站最合适',
      '好处：免费托管、加载快、不用维护服务器'
    ],
    answerDemo: '写在项目里的 JS 文件中，一个数组导出，组件 import 进来用。加一篇笔记就往数组里加一条，重新部署就更新了。不用后端是因为内容就是我自己写的笔记和介绍，没有用户交互和动态数据，纯静态最合适——免费托管、加载快、不用维护服务器。',
    source: '面试准备 2026-09-06'
  }
]

// 获取所有出现过的分类（页面按分类分组展示）
export const categories = [...new Set(interviewQuestions.map((q) => q.category))]
