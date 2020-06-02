const fs = require("fs");
const webpack = require("webpack");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    PACKAGE_VERSION: '"' + version + '"',
                },
            }),
        ],
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/utils/_variables.scss";`,
            },
        },
    },

    pwa: {
        name: "דיווחי מגן דוד אדום",
        themeColor: "#10133B",
        msTileColor: "#10133B",
        appleMobileWebAppStatusBarStyle: "black-translucent",
        appleMobileWebAppCapable: "yes",
        assetsVersion: version,
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            // skipWaiting: true,
            // clientsClaim: true,
            swSrc: "src/service-worker.js",
            exclude: [/\.map$/],
        },
        manifestOptions: {
            short_name: 'דיווחי מד"א',
            background_color: "#E0E0E0",
        },
    },

    pluginOptions: {
        i18n: {
            locale: "he",
            fallbackLocale: "he",
            localeDir: "locales",
            enableInSFC: true,
        },
    },
};
