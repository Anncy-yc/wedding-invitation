import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据环境模式设置base路径
  const base = mode === 'production' 
    ? '/wedding-invitation/' // 生产环境（GitHub Pages部署）：带仓库名
    : '/'; // 开发环境：根路径，本地访问更友好

  return {
    plugins: [vue()],
    base: base,
    resolve: {
      alias: {
        // __dirname是当前文件所在目录，@指向src文件夹
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})