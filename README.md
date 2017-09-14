#基本配置

复制命令行
>npm install autoprefixer 
    babel-core 
    babel-loader 
    babel-preset-latest 
    cross-env 
    css-loader 
    extract-text-webpack-plugin
    file-loader 
    html-loader 
    html-webpack-plugin 
    image-webpack-loader 
    less 
    less-loader 
    postcss-loader 
    style-loader 
    url-loader 
    vue-loader 
    vue-template-compiler 
    webpack 
    webpack-dev-server
    --save-dev

>npm install vue vue-router --save

package.json 里面script 添加 如下代码
>"dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot"

>"build": "cross-env NODE_ENV=production  webpack --progress"

新建 postcss.config.js 文件
```javascript
module.exports = {
    plugins: [require('autoprefixer')({browsers: ['last 5 versions']})]
}
```

>注意，不要缺少 .babelrc 文件