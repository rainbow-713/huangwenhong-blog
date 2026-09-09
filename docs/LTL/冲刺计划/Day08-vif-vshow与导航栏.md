# Day 8 · v-if / v-show + 导航栏（点一下，状态就变）

> **15 天冲刺 · 第 8 天**｜预计 **5 小时**｜今天手敲顶部导航栏 `NavBar.vue`——它最能体现前端最爽的一件事：**点一下、状态变、页面跟着变**
> 配套文档都在上一级 `docs/LTL/`：[面试题库-背诵版](../2026-09-07-面试题库-背诵版.md)（今天背题库 13）｜[面试包](../2026-09-06-实习生定位-博客单项目面试包.md)（手写题第 8 题 URL 参数解析）

**三条铁律**：① 只看不敲 = 没学；② 手敲重建：看懂 → 关掉 → 重敲 → 敲不出瞄一眼 → 再关掉重敲；③ 别一卡就让 AI 替你写，先自己想，不懂才问。

---

## 今天目标 & 时间安排

**今天目标**：手敲顶部导航栏 `NavBar.vue`，搞懂 v-if / v-show 的区别，理解"手机菜单点一下展开"是怎么用 `ref` 存状态实现的；顺带看懂"关于我"页。

**今天大概 5 小时**：
- 🌅 上午（约 2h）：读懂 v-if / v-show + ref 存状态 + onMounted
- 🌇 下午（约 2h）：手敲导航栏 NavBar.vue + 看懂关于我页
- 🌆 傍晚（约 1h）：手写题（URL 参数解析）+ 背题库 13 + 复盘

**今天时间表（拆到每半小时，照着走；时间点按你自己作息平移即可）**：

| 时间 | 干什么 |
|---|---|
| 09:00–09:50 | 读懂：v-if vs v-show（真删除 vs 切 display） |
| 09:50–10:00 | 休息 |
| 10:00–10:50 | 读懂：ref 存状态 + onMounted 生命周期 |
| 10:50–11:30 | 看懂 `NavBar.vue`：navItems / menuOpen / router-link-active |
| 11:30–13:30 | 午饭 + 午休 |
| 13:30–14:30 | 关掉，重敲 `NavBar.vue`（今天重点） |
| 14:30–14:50 | 把浏览器窗口拉窄，点手机菜单按钮，看它展开/收起 |
| 14:50–15:10 | 休息 |
| 15:10–15:50 | 手写题：URL 参数解析（白纸默写到会） |
| 15:50–16:20 | 背题库 13（v-if / v-show 区别） |
| 16:20–16:40 | 写今日复盘 |

**今天要打开的文件**：
- 💻 代码：`src/components/NavBar.vue`（重点，看懂 + 重敲）、`src/views/AboutView.vue`（看懂即可，不用重敲）
- 📖 文档：《面试题库-背诵版》题库 13，《面试包》第五节第 8 题（URL 参数解析）

---

## ① 先读懂（上午 · 约 2h）——大白话

### 1. v-if vs v-show（面试高频，务必分清）
两个都能"控制一个东西显示 / 隐藏"，但背后完全不一样：

```vue
<!-- v-if：条件为 false 时，元素压根不存在于页面（真的被删掉/不渲染） -->
<p v-if="show">我只有 show 为 true 时才存在</p>

<!-- v-show：元素一直在，只是把 CSS 的 display 切成 none 藏起来 -->
<p v-show="show">我一直都在，只是被 display:none 藏起来了</p>
```

| 对比 | v-if | v-show |
|---|---|---|
| 本质 | 真的销毁 / 重建元素 | 只切 CSS `display`（none ↔ 原值） |
| 不显示时 | DOM 里**没有**这个元素 | DOM 里**还在**，只是看不见 |
| 切换开销 | 大（反复创建销毁） | 小（只改一个样式） |
| 初始渲染 | 条件 false 就**不渲染**（省首屏） | **一定会渲染**（哪怕一开始藏着） |
| 什么时候用 | 不常变、或一开始可能根本不显示 | **频繁来回切换**（比如手机菜单） |

> **一句话记忆**：`v-if` 是"真删除、假则不存在"；`v-show` 是"假藏起来、东西还在"。**频繁切换用 v-show 更省。**

**在项目哪看得到**：`NavBar.vue` 里手机下拉菜单用的正是 **v-show**——因为用户会反复点按钮开开关关，用 v-show 只切 display、不用反复销毁重建，更流畅：
```vue
<!-- NavBar.vue 真实代码：移动端下拉菜单用 v-show 控制 -->
<nav v-show="menuOpen" class="mobile-nav"> ... </nav>
```

### 2. ref 存状态：一个会变的开关
一个"会变的数据"用 `ref` 装（Day 6 学过）。导航栏那个"手机菜单展开 / 收起"的开关，就是一个 `ref(false)`：
```js
import { ref } from 'vue'
const menuOpen = ref(false)          // 菜单默认收起
// 点按钮：把它取反（false→true→false……）
// 模板里：<button @click="menuOpen = !menuOpen">
```
- **交互链**：点按钮 → `menuOpen` 从 `false` 变 `true` → `v-show="menuOpen"` 成立 → 菜单显示出来。再点一下反过来收起。这就是前端最核心的"**改状态 → 界面自动跟着变**"。
- ⚠️ 注意：在**模板**里写 `menuOpen = !menuOpen` 不用 `.value`（模板自动解包）；但在 **JS 逻辑**里改要写 `menuOpen.value = !menuOpen.value`。

### 3. onMounted：组件"出现之后"才做的事（生命周期）
```js
import { onMounted } from 'vue'
onMounted(() => {
  // 组件已经挂载到页面上之后，才会执行这里
  // 常见用途：发网络请求拿数据、初始化第三方库
  console.log('导航栏已经出现在页面上了')
})
```
- **大白话**：`onMounted` 就是"等这个组件在页面上露脸之后，再干的一段活"。今天 NavBar 里没用到它，但你面试要能说清它是干嘛的。

### 4. router-link-active：当前页导航项自动高亮
`<router-link>` 点到哪个页面，Vue Router 会自动给它加一个 `router-link-active` 类名。你只要在 CSS 里给这个类写个高亮样式，当前所在页面的导航项就自动变色了——**不用自己写逻辑判断"现在在哪个页"**。
```css
/* NavBar.vue 真实代码：激活的导航项用主色 + 加粗 */
.nav-links a.router-link-active {
  color: var(--color-primary);
  font-weight: 600;
}
```

---

## ② 动手做（下午）

1. 打开 `src/views/AboutView.vue`，**看懂即可（不用重敲）**：它就是一堆区块（教育背景、学习路线时间轴、校园经历、获奖、证书、自我评价），每个区块都用 `v-for` 循环 `profile.js` 里的数据渲染出来。重点感受：**页面内容全来自数据文件**（数据驱动，Day 5 学过）。
   ```vue
   <!-- AboutView.vue 真实代码：循环渲染时间轴 -->
   <div v-for="(step, i) in learningTimeline" :key="i" class="timeline-item"> ... </div>
   ```
2. 打开 `src/components/NavBar.vue`（**今天重点**），看懂这四样：
   - `navItems`：四个导航项的数据（首页 / 关于我 / 学习笔记 / 项目展示），集中放一个数组里，以后加页面只改这里；
     ```js
     const navItems = [
       { path: '/', label: '首页' },
       { path: '/about', label: '关于我' },
       { path: '/notes', label: '学习笔记' },
       { path: '/projects', label: '项目展示' }
     ]
     ```
   - `menuOpen` 这个 `ref`：手机菜单的开关（见上面第 2 点）；
   - **两套导航**：桌面端 `.nav-links`（宽屏显示）vs 手机端 `.mobile-nav`（窄屏显示），靠 `@media (max-width: 768px)` 切换（Day 5 学的响应式）；
   - `router-link-active`：当前页导航项自动高亮（见上面第 4 点）。
3. **关掉**，凭记忆重敲 `NavBar.vue`——重点体会"**点按钮 → `menuOpen` 变 → 菜单显示/隐藏**"这条交互链，以及 `v-for` 循环 `navItems` 渲染导航项。
4. 跑起来，把浏览器窗口**拉窄**（模拟手机），点右上角汉堡按钮，**亲眼看菜单展开 / 收起**；再点一个链接，看菜单自动收起、页面跳转、对应导航项高亮。
- ✅ **做对的标志**：不看原文件能敲出 NavBar 的核心（navItems + menuOpen + v-for + v-show）；能讲清"手机菜单点一下展开"是用 ref 存状态 + v-show 实现的。

---

## ③ 手写题：URL 参数解析（傍晚 · 约 40min）

> 对应《面试包》第五节 **第 8 题**。把网址后面那串参数解析成对象。

**大白话**：把 `'?a=1&b=2'` 变成对象 `{ a: '1', b: '2' }`。思路三步：**去掉开头的 `?` → 按 `&` 拆成一条条 → 每条再按 `=` 拆成"键"和"值"**。

**三步练**：看懂思路 → 照着敲 → **白纸默写**。

**⚠️ 先自己白纸默写，默不出再看答案对——不要一上来就抄。**

```js
// '?a=1&b=2' → { a: '1', b: '2' }
function parse(url) {
  const obj = {}
  // ① 去掉 '?' 之前的部分，只留 'a=1&b=2'
  // ② 按 '&' 拆成 ['a=1', 'b=2']，逐条处理
  url.slice(url.indexOf('?') + 1).split('&').forEach(pair => {
    if (!pair) return                 // 空串跳过（比如结尾多了个 &）
    const [k, v] = pair.split('=')    // ③ 按 '=' 把 'a=1' 拆成 k='a'、v='1'
    obj[k] = v                        // 存进对象
  })
  return obj
}
```

**另一种写法（用 `reduce`，讲得出更加分）**：
```js
function parse(url) {
  return url.slice(url.indexOf('?') + 1).split('&').reduce((obj, pair) => {
    if (!pair) return obj
    const [k, v] = pair.split('=')
    obj[k] = v
    return obj                        // reduce 每轮要把累加对象 return 出去
  }, {})                              // 初始值是空对象 {}
}
```

**面试怎么说（一句话）**：「先切掉 `?` 前的部分，按 `&` 拆成每个键值对，再按 `=` 拆出 key 和 value 塞进对象；也可以直接用浏览器自带的 `URLSearchParams`。」

---

## ④ 要背的题

**题库 13（v-if 和 v-show 的区别）**：能说清 v-if 是真销毁/重建（不显示时 DOM 里没有）、v-show 只是切 `display:none`（东西还在），频繁切换用 v-show 更省，并能举出项目里手机菜单用 v-show 的例子。

---

## ⚠️ 今天最容易踩的坑

- **v-if / v-show 说反** → 记住：v-if 真删除、v-show 只藏（display）。
- **JS 里改 ref 忘了 `.value`** → 模板里 `menuOpen = !menuOpen` 不用 `.value`，但 JS 逻辑里必须 `menuOpen.value = ...`。
- **以为高亮要自己判断当前页** → 不用，`router-link-active` 是 Vue Router 自动加的类，你只写 CSS。
- **重敲时漏了 `:key`** → `v-for` 循环 navItems 要配 `:key="item.path"`。
- **手机菜单点了链接不收起** → 记得在链接上加 `@click="menuOpen = false"`（点完自动关菜单）。

## 🆘 卡住了怎么办

1. 先自己回看《预备篇》+ `NavBar.vue`、`AboutView.vue` 里的真实代码。
2. 还不懂 → 记到「问题本」。
3. **晚上集中问哥哥**（先自己想过一遍再问）。

---

## ✅ 今天过关标准（对着勾，全打勾才算过）

- [ ] 能讲清 v-if / v-show 区别，知道频繁切换该用哪个、为什么
- [ ] 能讲清导航栏手机菜单"点一下展开"是用 ref 存状态 + v-show 实现的
- [ ] 重敲出了 NavBar.vue（含 navItems + menuOpen + v-for + v-show）
- [ ] 白纸默写出 URL 参数解析
- [ ] 背出题库 13

## 📝 今日复盘（用自己的话写，不许抄）

- 今天我真正搞懂了：______
- v-if 和 v-show 我能一句话讲清吗：______
- 还没懂、要问哥哥的是：______

---

⬅️ 上一天：[Day 7 · 动态路由与笔记详情](./Day07-动态路由与笔记详情.md)｜➡️ 下一天：[Day 9 · 闭包 Promise 与闭卷重写](./Day09-闭包Promise与闭卷重写.md)｜🏠 [返回资料总览](../README.md)
