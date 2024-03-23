const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../backend/public/'), // frontend 파일이 backend에 저장될 위치
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '/api': {
          // 프록시 요청을 보낼 서버의 주소
          target: process.env.VUE_APP_HOST
      },
    }
  }
});