var express = require('express');
var path = require('path');
var router = require('./router');
var body = require('body-parser');
var session = require('express-session');

var app = express();

//2.0 将所有api的请求响应content-type设置为application/json
app.all('/api/*', (req, res, next) => {
    //设置允许跨域响应报文头
    //设置跨域
    // 启用 Node 服务器端的 cors 跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "*");

    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// 配置中间件
app.use(body.urlencoded({ extended: false }));
// parse application/json
app.use(body.json());

// 挂载路由
app.use(router);

app.listen(3000,function () {
    console.log("Server Win!!!")
})
