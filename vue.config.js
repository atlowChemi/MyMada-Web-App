module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/utils/_variables.scss";`
      }
    }
  },
  pwa: {
    name: 'דיווחי מגן דוד אדום',
    themeColor: '#10133B',
    msTileColor: '#10133B',
    manifestOptions: {
      background_color: '#E0E0E0'
    }
  }
}