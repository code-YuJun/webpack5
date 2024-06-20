const path = require("path")
module.exports = {
    entry: "./src/main.js",
    output: {
        // 所有文件的输出路径,__dirname 是 nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"),
        // 入口文件打包输出文件名
        filename: "js/main.js",
        clean:true
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
                test:/\.(png|jpe?g|gif|webp|svg)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        // 小于10kb的转换为 base64
                        maxSize:10 * 1024
                    }
                },
                generator:{
                    // 输出图片名称
                    filename:"images/[hash:8][ext][query]"
                }
            }
        ],
    },
    plugins: [

    ],
    mode: "development"
}