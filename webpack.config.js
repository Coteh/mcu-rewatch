const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./site/index.ts",
    mode: process.env.NODE_ENV || "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: [
                    /node_modules/
                ],
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [ ".ts", ".js", ".vue", ".json" ]
    },
    output: {
        filename: "assets/js/[name].bundle.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "site/index.html"
        }),
        new CopyWebpackPlugin([
            {
                from: "site/assets/img",
                to: "assets/img",
                ignore: [".gitkeep"]
            }
        ]),
        new VueLoaderPlugin()
    ]
};
