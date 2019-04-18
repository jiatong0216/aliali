
const express = require('express');
const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//创建路由对象
const router = express.Router();


//显示后台登录页
router.get('/admin/login', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/login.html'));
});

//显示后台首页
router.get('/admin/index', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/index.html'));
});

// 验证登录信息
router.post('/admin/checkLogin', (req,res)=>{
    // 接受数据 -- 登录账号 密码
    const email = req.body.email;
    const passwd = req.body.passwd;
    // console.log(passwd)
    // 编写SQL语句
    const sql = 'select * from ali_admin where admin_email=? and admin_pwd=?';
    // 执行SQL语句
    // 查询的是数组,增删改得到的是对象
    db.query(sql,[email,passwd] ,( err ,result)=> {
        // 处理sql执行结果
        if (err || result.length != 1) {
            // 登录失败
            return res.send({code: 201, message: '登录失败'})
        }
        // 登录成功,将登录信息保存到session中
        req.session.isLogin = true;
        req.session.userInfo = result[0];
        res.send({code: 200, message: '登录成功'})
    })
});
// 退出登录
// 注销session(req.session.destroy),将结果返回前端
router.post('/admin/logout',(req,res) => {
    // 回调函数中的参数是错误对象
    // 如果清除session失败,则err是一个错误对象
    // 如果清除session成功,err是null
    req.session.destroy(function(err){
        if(err) {
            // 退出失败
            return res.send({code: 201, message: '退出失败'});
        }
        res.send({code: 200, message: '退出成功'})
    })
})

module.exports = router;