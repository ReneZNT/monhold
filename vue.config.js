const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  chainWebpack: config => {
    config.externals({ path: 'path', fs: 'fs' });
  }
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: './',
      build: {
        icon: "src/assets/favicon.ico",
        appId: "br.edu.unoesc.monhold",
        linux: {
          target: [
            "AppImage",
            "deb"
          ]
        },
        publish: [
          {
            provider: "github"
          }
        ]
      },
      preload: 'src/preload.js'
    },
  }
}