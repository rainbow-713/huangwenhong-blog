// Vite 构建配置文件
// 面试知识点：vite.config.js 是 Vite 的配置文件，基于 Node.js 运行，
// 和浏览器里跑的 Vue 代码是两个环境，注意区分。
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 部署基础路径：Vercel 部署在根路径 '/'；
  // GitHub Pages 项目站点部署在子路径，由 CI 工作流注入 BASE_PATH 环境变量
  base: process.env.BASE_PATH || '/',
  // 注册 Vue 插件，让 Vite 能编译 .vue 单文件组件
  plugins: [vue()],
  server: {
    // 本地开发服务器端口
    port: 5173
  },
  build: {
    // 打包输出目录（Vercel 默认部署的就是这个目录）
    outDir: 'dist'
  }
})
