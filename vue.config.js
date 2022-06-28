const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})


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
          icon: 'public/icon.png',
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