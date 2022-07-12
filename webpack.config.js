const HtmlWebpackPlugin = require("html-webpack-plugin")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        home: `${__dirname}/app/webpack/entry/home`
    },

    output: {
        path: `${__dirname}/public/packs`,
        publicPath: `${__dirname}/app/webpack`,
        filename: "[name].js"
    },

    module: {
        rules: [{
                test: /\.(tsx|ts)$/,
                loader: "ts-loader"
            },
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: true }
                    }
                ]
            },
            // {
            //     test: /\.(jpg|png)$/,
            //     loader: "file-loader?name=/public/[name].[ext]"
            // },
            { test: /\.(eot|svg|woff|ttf|gif)$/, loader: "url-loader" }
        ]
    },

    watchOptions: {
        poll: 500
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/app/webpack/index.html`,
            filename: "index.html"
        }),
        new WebpackManifestPlugin({
            fileName: "manifest.json",
            publicPath: "/packs/",
            writeToFileEmit: true
        })
    ],
    devServer: {
        host: "localhost",
        headers: {
          // CORSのアレ => https://hakozaru.com/posts/http-cors
          "Access-Control-Allow-Origin": "*",
        },
        devMiddleware: {
          publicPath: "/packs/",
        },
        static: {
          // サーバーの起点となるディレクトリ(監視するディレクトリ)
          // outputオプションのpathと同じディレクトリが指定されるはず
          directory: path.resolve(__dirname, "public/packs"),
        }
    },
};