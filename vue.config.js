module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    resolve: {
      extensions: [], //省略后缀
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        store: "@/store",
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://121.4.105.202:8889/',
        // target: 'http://127.0.0.1:8889/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
