const fs = require("fs");
const webpack = require("webpack");
const packageJson = require("./package.json");
const version = packageJson.version || 0;
module.exports = {
    configureWebpack: {
        devtool: "source-map",
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    PACKAGE_VERSION: '"' + version + '"',
                },
            }),
        ],
    },
    publicPath:
		process.env.NODE_ENV === "production" && !process.env.HEROKU ? "/MyMada-Web-App/" : "/",
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
            swSrc: "src/service-worker.js",
            exclude: [/\.map$/],
        },
        manifestOptions: {
            short_name: 'דיווחי מד"א',
            background_color: "#E0E0E0",
            related_applications: [
                {
                    platform: "play",
                    id: "atlow.chemi.mymada",
                },
            ],
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
