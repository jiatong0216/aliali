//轮播图管理
const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

router.get('/admin/other/slides',(req, res)=> {
    res.render(path.join(rootPath, 'view', 'admin/other/slides.html'));
});

module.exports= router;