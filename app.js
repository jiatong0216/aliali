//1. 加载 express 模块
const express = require('express');
// 2. 创建服务器
const app = express();

// 3.启动服务器
app.listen(3000, () => console.log('ok'));

// 将 __dirname 保存到全局作用域中
global.rootPath = __dirname;

//托管静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

//配置模板引擎
app.engine('html', require('express-art-template'));

// 加载body-parser模块,在注册为中间件
const bp = require('body-parser');
app.use(bp.urlencoded({ extended: false }));
// 加载 express-session 模块,注册中间件
// 注册该中间价之后,req对象才有session子对象-- req.session
const session = require('express-session');
app.use(session({
    secret: 'ssadasdasd',
    resave: false,
    saveUninitialized: false
}));
// 将检测session的中间价函数进行注册  ----必须在注册session中间件后才能注册checkSession中间件
app.use(checkSession);

const fs = require('fs');
const path = require('path');
// 加载路由模块,在注册为中间价
fs.readdir(path.join(__dirname, 'routers'), (err, result) => {
    if (err) {
        // 读取失败
        return console.log(err);
    }
    // 读取成功,循环将这些模块加载,在注册成中间件
    for (let i = 0; i < result.length; i++) {
        let router = require(path.join(__dirname, 'routers', result[i]));
        app.use(router);
    }
});


// 将检测session的代码封装为中间件函数
function checkSession(req, res, next) {
    // 将允许直接访问的路由设置为一个数组
    const allow_url = ['/admin/login','/index','/list','/detail', '/admin/checkLogin']
    // 判断当前访问的路由是否存在于该数组中,如果存在则next(),不存在检测session
    if (allow_url.includes(req.url) == true) {
        // 当前访问的url地址存在于allow_url数组中,直接next();
        next();
    } else {
        // 判断isLogin是否为true
        if (req.session.isLogin != true) {
            // 不等于true, 说明没有登录,跳转回登录页
            return res.redirect('/admin/login');
        }
        next();
    }
}