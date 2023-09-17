import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {

  if (command === 'serve') {
    return {
      // dev 独有配置
      resolve: {
        alias:{
          "~": path.resolve(__dirname, "src")
        }
      },
      // 跨域处理，代理，打包不生效，靠nginx
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          }
        }
      },
      plugins: [
        vue(),
        WindiCSS(),
      ],
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
      resolve: {
        alias:{
          "~": path.resolve(__dirname, "src")
        }
      },
      // 跨域处理，代理
      // server: {
      //   proxy: {
      //     '/api': {
      //       target: 'http://localhost:8081',
      //       changeOrigin: true,
      //       rewrite: (path) => path.replace(/^\/api/, ''),
      //     }
      //   }
      // },
      plugins: [
        vue(),
        WindiCSS(),
      ],
    }
  }
})