//个人中心相关处理

const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//显示profile.html 文件
router.get('/admin/center/profile',(req, res)=> {
    // console.log(req.session.userInfo);
    res.render(path.join(rootPath, 'view/admin/center/profile.html'),req.session.userInfo);
})

module.exports = router;
