import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  console.log(command, mode);
  const plugins: any[] = [vue()];
  // 开发服务器配置
  let devServer = null;
  if (command === "serve") {
    const configPath = "./local-config";
    const localConfig = require(configPath);
    const devCfg = localConfig.development;

    devServer = {
      open: true,
      proxy: {
        // 从自定义配置文件·`loacl-config.ts`中加载后端api访问地址
        "/api": devCfg.apiProxyUrl,
      },
    };
  }
  return {
    base: "./",
    envDir: "./env",
    plugins,
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: devServer,
  };
});
