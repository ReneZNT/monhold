const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  chainWebpack: config => {
    config.externals({ path: 'path', fs: 'fs', ip: 'ip' });
  }
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: './',
      builderOptions: {
        productName: 'monhold',
        appId: "br.edu.unoesc.monhold",   
        linux: {
          target: [
            "AppImage",
            "deb"
          ],
          asar: false,
        },
        win: {
          target: [
            "nsis",
            "portable"
          ],
          asar: false,
        },
        mac: {
          target: [
            "dmg",
            "zip"
          ],
          asar: false,
        },
        "nsis": {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true,
        },
        publish: [
          {
            provider: "github"
          }
        ]
      },
      preload: './src/preload.js'
    },
  }
}