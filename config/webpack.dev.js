const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "/src/main.js",
    output: {
        // 所有文件的输出路径,开发模式没有输出
        path: undefined,
        // 入口文件打包输出文件名
        filename: "js/main.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 将js中的css通过创建style标签添加到html中
                    "style-loader",
                    // 将css资源编译成commonjs的模块到js中
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的转换为 base64
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    // 输出图片名称
                    filename: "images/[hash:8][ext][query]"
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource", // 字体文件不需要转base64
                generator: {
                    filename: "font/[hash:8][ext][query]"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules代码不编译
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            exclude: 'node_modules'
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
    ],
    // 开发服务器
    // npx webpack serve
    // 使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true // 开启HMR功能（只能用于开发环境，生产环境不需要了）在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。
    },
    mode: "development",
    devtool: "cheap-module-source-map",
}