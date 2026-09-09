# Day 9 · 闭包 + Promise + 闭卷重写（真会假会，今天见分晓）

> **15 天冲刺 · 第 9 天**｜预计 **5.5 小时**｜今天补齐 JS 两个高频概念（闭包、Promise），再把前几天敲过的关键文件**闭卷重写**一遍——不看原文件，检验你是真会还是假会
> 配套文档都在上一级 `docs/LTL/`：[面试题库-背诵版](../2026-09-07-面试题库-背诵版.md)（今天背题库 6、7、9）｜[面试包](../2026-09-06-实习生定位-博客单项目面试包.md)（手写题第 9 题驼峰↔中划线）

**三条铁律**：① 只看不敲 = 没学；② 手敲重建：看懂 → 关掉 → 重敲 → 敲不出瞄一眼 → 再关掉重敲；③ 别一卡就让 AI 替你写，先自己想，不懂才问。

---

## 今天目标 & 时间安排

**今天目标**：搞懂闭包和 Promise（面试高频），并**闭卷重写** `global.css`、`NoteCard.vue`、`router/index.js`、`NoteDetailView.vue`——敲不出来的地方，就是你还没真会的地方。

**今天大概 5.5 小时**：
- 🌅 上午（约 2h）：读懂闭包 + Promise + async/await
- 🌇 下午（约 2.5h）：闭卷重写 4 个关键文件（今天最关键）
- 🌆 傍晚（约 1h）：手写题（驼峰↔中划线）+ 背题库 6、7、9 + 复盘

**今天时间表（拆到每半小时，照着走；时间点按你自己作息平移即可）**：

| 时间 | 干什么 |
|---|---|
| 09:00–09:50 | 读懂：闭包（用防抖的 timer 举例） |
| 09:50–10:00 | 休息 |
| 10:00–11:00 | 读懂：Promise 三态 + async/await |
| 11:00–11:30 | 自己复述一遍闭包、Promise 给自己听 |
| 11:30–13:30 | 午饭 + 午休 |
| 13:30–14:20 | 闭卷重写 `global.css` 通用样式 + `NoteCard.vue` |
| 14:20–14:40 | 休息 |
| 14:40–15:40 | 闭卷重写 `router/index.js` + `NoteDetailView.vue` 核心逻辑 |
| 15:40–16:20 | 手写题：驼峰↔中划线（白纸默写到会） |
| 16:20–16:50 | 背题库 6、7、9 |
| 16:50–17:10 | 写今日复盘（重点记下闭卷时敲不出的是哪块） |

**今天要打开的文件**：
- 💻 代码（**闭卷重写，先别看**）：`src/styles/global.css`、`src/components/NoteCard.vue`、`src/router/index.js`、`src/views/NoteDetailView.vue`
- 📖 文档：《面试题库-背诵版》题库 6、7、9，《面试包》第五节第 9 题（驼峰↔中划线）

---

## ① 先读懂（上午 · 约 2h）——大白话

### 1. 闭包：函数"记住"了它出生时周围的变量
一个函数哪怕"出生"它的外层函数已经执行完了，它**还能用**外层函数里的变量——这就叫闭包。

你 **Day 2 写的防抖**里那个 `timer`，就是最典型的闭包：
```js
function debounce(fn, delay) {
  let timer = null                 // ← 这个 timer 被下面返回的函数"记住"了
  return function (...args) {
    clearTimeout(timer)            // 每次触发先清掉上一个定时器
    timer = setTimeout(() => {     // 重新计时
      fn.apply(this, args)
    }, delay)
  }
}
// debounce(...) 已经执行完了，但返回的函数每次被调用，都还能读到、改到那个 timer
// —— 因为 timer 被"闭"在返回的函数里了，这就是闭包
```
- **一句话**：闭包 = 函数 + 它出生时能访问的那些变量，变量不会因为外层函数结束就被回收。
- **用处**：让一个变量"藏"起来又能被持续读写（比如防抖的 timer、计数器）。

### 2. Promise：处理"要等一会儿才有结果"的事（异步）
发网络请求、读文件这类"不能马上拿到结果"的活，用 Promise 来管。它有**三种状态**：
```
pending（进行中）──成功──→ fulfilled（已成功）
                  └─失败──→ rejected（已失败）
```
> 状态**一旦从 pending 变成功或失败，就定死了，不会再变**。

```js
const p = new Promise((resolve, reject) => {
  // 模拟一件要等一会儿的事
  setTimeout(() => {
    const ok = true
    ok ? resolve('成功的数据') : reject('出错了')
  }, 1000)
})

p.then(res => console.log('成功：', res))    // fulfilled 走这里
 .catch(err => console.log('失败：', err))   // rejected 走这里
 .finally(() => console.log('不管成败都执行')) // 收尾（比如关掉 loading）
```

### 3. async / await：Promise 的"语法糖"，让异步读起来像同步
```js
// 用 .then 链式写：
function load() {
  return fetch('/api/notes')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

// 用 async/await 写（更好读，等价效果）：
async function load() {
  try {
    const res = await fetch('/api/notes')  // await：等这个 Promise 出结果再往下
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.log(err)                       // 出错统一在 catch 里接
  }
}
```
- **一句话**：`async` 声明这是个异步函数，`await` 让它"等一下"Promise 的结果再继续，代码看起来就像一行行同步执行，更好读、更好处理错误。
- ⚠️ 你的博客**数据是本地 JS 文件、没有真的发请求**，所以项目里暂时用不到 async/await——但面试常问，要能说清。

---

## ② 动手做（下午 · 闭卷重写，今天最关键）

> **规则**：全程**先不看原文件**，凭记忆敲。敲不出来的地方，才去看一眼原文件，看完**立刻关掉再重敲**，直到能独立敲出来为止。

1. **闭卷重写 `src/styles/global.css`** 的通用样式部分：`:root` 里的 CSS 变量（颜色令牌）、`* { box-sizing: border-box }`、`.container` 居中、Flex 纵向布局那套。
2. **闭卷重写 `src/components/NoteCard.vue`**：一个 `props` 接收 `note`，模板里显示标题、日期、标签、摘要，`<router-link>` 跳到 `/notes/:id`。
3. **闭卷重写 `src/router/index.js`** 的路由表 + `createWebHistory` + 懒加载写法 + `NoteDetailView` 的核心逻辑（`computed(() => getNoteById(route.params.id))` + `v-if` 兜底）。
4. **哪块敲不出，就是你还没真会的地方**——重点标记到「问题本」，明天（Day 10）优先补。
- ✅ **做对的标志**：不看原码，能独立敲出 NoteCard.vue 和路由表的主要结构；闭卷时卡壳的地方都记下来了。

---

## ③ 手写题：驼峰 ↔ 中划线互转（傍晚 · 约 40min）

> 对应《面试包》第五节 **第 9 题**。前端经常要处理这种命名转换（CSS 的 `background-color` ↔ JS 的 `backgroundColor`）。

**大白话**：`'get-element'`（中划线）↔ `'getElement'`（驼峰）来回转。核心是用 `replace` + 正则找到目标字符再替换。

**三步练**：看懂正则怎么匹配 → 照着敲 → **白纸默写**（两个方向都要会）。

**⚠️ 先自己白纸默写，默不出再看答案对——不要一上来就抄。**

```js
// 中划线 → 驼峰：'get-element' → 'getElement'
// 正则 /-(\w)/g 找到每个 "-字母"，把那个字母转大写、去掉横杠
const camelize = (s) => s.replace(/-(\w)/g, (_, c) => c.toUpperCase())

// 驼峰 → 中划线：'getElement' → 'get-element'
// 正则 /[A-Z]/g 找到每个大写字母，前面加 "-" 并转小写
const dashify = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
```

**replace 第二个参数是函数时的规律（讲得出加分）**：`replace(正则, (匹配到的整串, 第1个括号, ...) => 返回值)`——比如 `camelize` 里 `_` 是整个 `-e`，`c` 是括号里的 `e`，返回 `c.toUpperCase()` 就把它换成 `E`。

**面试怎么说（一句话）**：「中划线转驼峰用 `replace(/-(\\w)/g, ...)` 把横杠后字母大写；驼峰转中划线用 `replace(/[A-Z]/g, c => '-' + c.toLowerCase())` 给大写字母前面加横杠并转小写。」

---

## ④ 要背的题

- **题库 6（Promise 三态）**：pending → fulfilled / rejected，状态一旦改变不可逆。
- **题库 7（深拷贝 vs 浅拷贝）**：浅拷贝只复制一层（引用类型还共用），深拷贝层层复制、互不影响。
- **题库 9（闭包）**：能说清"函数记住并访问出生时的变量"，并举防抖 timer 的例子。

---

## ⚠️ 今天最容易踩的坑

- **闭包只会背定义、举不出例子** → 一定要能说出"防抖里的 timer 就是闭包"。
- **以为 Promise 状态能反复变** → 不能，pending 一旦变 fulfilled/rejected 就定死。
- **`await` 用在非 async 函数里** → `await` 只能写在 `async` 函数里。
- **闭卷重写时忍不住偷看** → 偷看就失去检验意义了；实在敲不出，看一眼**立刻关掉重敲**。
- **驼峰转正则写错** → `-(\w)` 里的括号别漏，它决定了回调第二个参数拿到的是哪个字符。

## 🆘 卡住了怎么办

1. 先自己回看《预备篇》+ 这几个文件的真实代码（闭卷重写环节除外，那是要你先盲敲）。
2. 还不懂 → 记到「问题本」。
3. **晚上集中问哥哥**（先自己想过一遍再问）。

---

## ✅ 今天过关标准（对着勾，全打勾才算过）

- [ ] 能举一个闭包的例子（防抖里的 timer）并说清为什么它是闭包
- [ ] 能说清 Promise 的三种状态 + async/await 是什么
- [ ] 不看原码，独立敲出了 NoteCard.vue 和路由表的主要结构
- [ ] 白纸默写出驼峰↔中划线互转（两个方向）
- [ ] 背出题库 6、7、9

## 📝 今日复盘（用自己的话写，不许抄）

- 今天我真正搞懂了：______
- 闭卷重写时敲不出、要明天优先补的是：______
- 还没懂、要问哥哥的是：______

---

⬅️ 上一天：[Day 8 · v-if/v-show 与导航栏](./Day08-vif-vshow与导航栏.md)｜➡️ 下一天：[Day 10 · 工程网络与手写全测](./Day10-工程网络与手写全测.md)｜🏠 [返回资料总览](../README.md)
