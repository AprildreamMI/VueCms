var path = require('path');

// 在内存中生成HTML文件
var htmlWebpackPlugin = require('html-webpack-plugin');

//配置解析vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname, 'src/index.html'),//模板路径
            filename:'index.html'//自动生成的HTML文件的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{  // 配置第三方loader 模块
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },//处理css文件的规则
            { test: /\.(png|jpg|gif)$/, use: 'url-loader' },    //处理图片
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 处理JS
            { test: /\.vue$/, use: 'vue-loader' },   //配置vuer
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }  //配置sacc
        ]
    },
    resolve:{
        alias:{
            // 是否启用全部Vue
            // 'vue$': 'vue/dist/vue.js'
        }
    }
}