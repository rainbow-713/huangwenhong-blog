// ============================================================
// 学习笔记数据模块
// 数据结构：
//   id       - 唯一标识，用于路由 /notes/:id 匹配
//   title    - 笔记标题
//   date     - 发布日期
//   tags     - 标签（数组）
//   summary  - 摘要（列表页展示）
//   sections - 正文，按小节组织：
//              { heading: 小节标题, paragraphs: 段落数组, code: 可选代码块 { lang, text } }
// 新增笔记：直接在 notes 数组最前面追加一条即可（最新的放最前）
// ============================================================

export const notes = [
  {
    id: 4,
    title: '我的个人博客是怎么从零搭起来的',
    date: '2026-08-31',
    tags: ['Vue3', 'Vite', '项目实战'],
    summary: '记录本博客从需求规划、技术选型到组件设计、部署上线的完整过程，这是我第一个独立完成的 Vue3 项目。',
    sections: [
      {
        heading: '为什么要做这个项目',
        paragraphs: [
          '看完 Vue3 网课后我发现一个问题：知识点都听懂了，但关掉视频还是不知道怎么写一个完整的项目。于是我决定做一个个人博客，目标是能部署到互联网上、面试时能直接打开给面试官看。',
          '这个项目同时是我的"求职作品集"：页面里每个功能点，都要能在面试中讲清楚原理。'
        ]
      },
      {
        heading: '技术选型思路',
        paragraphs: [
          '构建工具选 Vite：冷启动快、配置简单，是目前 Vue 官方推荐方案。',
          '路由用 Vue Router 4 的 history 模式：URL 干净没有 # 号，但需要服务端配合处理刷新 404 问题，我在部署平台配置了路由重写规则解决。',
          '样式坚持手写原生 CSS 而不引入 UI 组件库：一方面体现 CSS 基本功，另一方面不被组件库封装挡住，能真正理解布局原理。',
          '数据层用本地 JS 模块而不是后端接口：纯静态项目足够，而且这种"数据与视图分离"的思想，和真实项目中接口数据驱动视图是一致的。'
        ]
      },
      {
        heading: '组件化设计',
        paragraphs: [
          '我把页面拆成了布局层（导航、页脚）与内容层（各页面组件），可复用的部分抽成独立组件，通过 props 传数据：',
        ],
        code: {
          lang: 'vue',
          text: `<!-- NoteCard.vue：笔记卡片组件，靠 props 接收数据 -->
<script setup>
defineProps({
  note: { type: Object, required: true }
})
</script>

<!-- 父组件里循环渲染 -->
<NoteCard v-for="n in noteList" :key="n.id" :note="n" />`
        }
      },
      {
        heading: '遇到的坑与收获',
        paragraphs: [
          '坑1：history 模式部署后刷新子页面 404。原因是服务器按 URL 找文件，而 /notes/1 并不存在对应文件。解决：配置服务器把所有路径重写回 index.html，由前端路由接管。',
          '坑2：组件样式互相污染。解决：统一使用 scoped 样式，全局样式只放在 global.css。',
          '最大的收获是理解了"工程化"：一个项目不是把页面拼出来就行，目录结构、命名规范、提交规范、部署流程共同决定了项目的质量。'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Vue Router 学习笔记：从 URL 到组件的映射',
    date: '2026-08-28',
    tags: ['Vue Router', '前端路由'],
    summary: '梳理前端路由的核心思想：URL 和组件的映射关系，以及 history 模式与 hash 模式的区别。',
    sections: [
      {
        heading: '什么是前端路由',
        paragraphs: [
          '传统网站每点一个链接就向服务器请求一个新页面。SPA（单页应用）只加载一次 HTML，之后切换页面由 JavaScript 完成：改变 URL，同时把对应的组件渲染到页面上，整个过程不刷新页面。',
          '所以前端路由的本质就是一张"URL → 组件"的映射表：',
        ],
        code: {
          lang: 'js',
          text: `const routes = [
  { path: '/', component: HomeView },
  { path: '/notes', component: NotesView },
  { path: '/notes/:id', component: NoteDetailView } // 动态路由
]`
        }
      },
      {
        heading: '两种模式的原理',
        paragraphs: [
          'hash 模式：URL 里带 # 号，靠监听 hashchange 事件感知变化，兼容性最好，但 URL 难看。',
          'history 模式：基于 HTML5 的 History API（pushState / replaceState），URL 干净。缺点是刷新时浏览器会真的向服务器请求该路径，服务器必须做兜底（重写回 index.html），否则 404。',
          '本项目用的就是 history 模式，并在部署时配置了重写规则。'
        ]
      },
      {
        heading: '动态路由与参数获取',
        paragraphs: [
          '路径中带 : 的部分是动态参数，比如 /notes/:id 可以匹配 /notes/1、/notes/2。在组件里通过 useRoute() 拿到参数：',
        ],
        code: {
          lang: 'js',
          text: `import { useRoute } from 'vue-router'
const route = useRoute()
// 访问 /notes/3 时，route.params.id === '3'（注意是字符串）`
        }
      },
      {
        heading: '路由守卫',
        paragraphs: [
          'router.beforeEach 是全局前置守卫，每次路由跳转前都会执行。常见用途：登录鉴权、修改页面标题、埋点统计。我在本项目用它来同步更新浏览器标签页标题。'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Vue3 响应式原理初探：为什么改了数据页面会自动变',
    date: '2026-08-25',
    tags: ['Vue3', '响应式'],
    summary: '用自己的话理解 Vue3 的响应式核心：Proxy 劫持数据 + effect 收集依赖 + 触发更新。',
    sections: [
      {
        heading: '一个让我困惑的问题',
        paragraphs: [
          '学 Vue 最神奇的地方是：我只改了数据，页面就自动更新了，我明明没写任何 DOM 操作。这背后就是响应式系统。'
        ]
      },
      {
        heading: 'Vue2 和 Vue3 的区别',
        paragraphs: [
          'Vue2 用 Object.defineProperty 劫持对象的每个属性，缺点是无法检测"新增属性"和"数组下标修改"。',
          'Vue3 改用 Proxy，直接代理整个对象，可以拦截新增、删除、数组下标等所有操作，性能也更好。'
        ]
      },
      {
        heading: 'ref 和 reactive 的选择',
        paragraphs: [
          'reactive 只能代理对象；ref 可以包装任意类型（数字、字符串、布尔），访问时要写 .value。',
          '我的使用原则：基本类型用 ref，对象/数组两者皆可，一个组件内保持统一。'
        ],
        code: {
          lang: 'js',
          text: `import { ref, reactive } from 'vue'

const count = ref(0)          // 基本类型：count.value++
const user = reactive({       // 对象：直接改属性即可触发更新
  name: '黄雯宏',
  skills: ['Vue3']
})`
        }
      },
      {
        heading: '我总结的一句话',
        paragraphs: [
          '响应式 = 数据被 Proxy 劫持 + 渲染时收集"谁用了我"（依赖收集）+ 数据变化时通知所有依赖更新。模板里的每个变量都是一个依赖。',
          '这也解释了为什么解构 reactive 对象会失去响应式：解构相当于把属性值复制给了普通变量，脱离了 Proxy 的劫持。'
        ]
      }
    ]
  },
  {
    id: 1,
    title: '组合式 API 学习总结：为什么 <script setup> 更好写',
    date: '2026-08-22',
    tags: ['Vue3', 'Composition API'],
    summary: '对比选项式 API 与组合式 API，理解按"逻辑功能"组织代码的思想，以及 setup 语法糖的常用写法。',
    sections: [
      {
        heading: '选项式 API 的痛点',
        paragraphs: [
          '选项式 API 把代码按 data / methods / computed / watch 拆开。功能简单时没问题，但当"一个功能"同时涉及数据、方法、计算属性时，相关代码被拆散到四个地方，读起来来回跳。'
        ]
      },
      {
        heading: '组合式 API 的思路',
        paragraphs: [
          '组合式 API 反过来：按"逻辑功能"组织代码。同一个功能的响应式数据、方法、计算属性写在一起，还可以抽成独立的"组合式函数"（composables）复用。',
          '<script setup> 是它的语法糖：顶层声明的变量和函数自动暴露给模板，不需要 return，代码更简洁。'
        ],
        code: {
          lang: 'vue',
          text: `<script setup>
import { ref, computed } from 'vue'

// 一个功能的代码放在一起：数据 + 派生数据 + 方法
const notes = ref([...])
const latestNote = computed(() => notes.value[0])
function addNote(note) {
  notes.value.unshift(note)
}
// 无需 return，模板里直接用 notes / latestNote / addNote
</script>`
        }
      },
      {
        heading: '常用 API 速记',
        paragraphs: [
          'ref：包装响应式数据，JS 里用 .value 访问，模板中自动解包。',
          'computed：计算属性，有缓存，依赖不变就不重新计算。',
          'watch / watchEffect：监听数据变化执行副作用（如请求数据）。',
          'onMounted：生命周期钩子，组件挂载完成后执行，常用于初始化请求。',
          'defineProps / defineEmits：子组件接收父组件数据、向父组件发事件的宏函数。'
        ]
      }
    ]
  }
]

// 根据 id 查找笔记（注意路由参数是字符串，需要转换比较）
export function getNoteById(id) {
  return notes.find((n) => String(n.id) === String(id))
}
