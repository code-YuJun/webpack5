const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独的 Css 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// CSS 压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 图片无损压缩
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// 合并配置 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    entry: "/src/main.js",
    output: {
        // 所有文件的输出路径,__dirname 是 nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),
        // 入口文件打包输出文件名
        filename: "js/main.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader"),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader"),
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader"),
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
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "css/main.css",
        }),
        // css压缩
        new CssMinimizerPlugin(),
        // 压缩图片
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    "preset-default",
                                    "prefixIds",
                                    {
                                        name: "sortAttrs",
                                        params: {
                                            xmlnsOrder: "alphabetical",
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ],
    devtool: "source-map",
    mode: "production"
}