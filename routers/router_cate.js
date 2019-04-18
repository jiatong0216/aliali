
const express = require('express');
const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//创建路由对象
const router = express.Router();
// 监听路由



// 显示栏目列表页
router.get('/admin/cate/cate', (req, res) => {
    
    res.render(path.join(rootPath, 'view', 'admin/cate/cate.html'));
});
//获取栏目数据
router.get('/admin/cate/getCate', (req, res) => {
    const sql = 'select * from ali_cate';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.send({ code: 201, message: "查询列表信息失败" });
        }
        res.send({ code: 200, message: "查询列表信息成功", list: result });
    })
});
// 显示添加栏目页面
router.get('/admin/cate/addcate', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/cate/addcate.html'));
});
//添加新栏目处理
router.post('/admin/cate/addCateDeal', (req, res) => {
    //1. 接受数据 -- 表单提交的栏目名和栏目图标
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }
    // 2. 编写SQL语句
    const sql = 'insert  into  ali_cate  set ?';
    // 3. 执行SQL语句
    db.query(sql, data, (err, result) => {
        // 4.处理SQL执行结果
        if (err) {
            console.log(err);
            return res.send({ code: 201, message: '添加新栏目失败' });
        }
        res.send({ code: 200, message: '添加新栏目成功' });
    })
});

//删除栏目 
router.post('/admin/cate/delcate',(req,res)=>{
    //1. 接收数据
    const id = req.body.id;
    // 2. 编写SQL语句
    const sql = 'delete from ali_cate where cate_id = ?';
    // 3. 执行SQL语句
    db.query(sql,id,(err,result)=>{
        // 4. 处理sql执行结果
        if(err || result.affectedRows != 1){
            console.log(err);
            return res.send({code:201, message: '删除栏目成功'})
        }
        res.send({code: 200,message:'删除栏目成功'});
    })
})

// 显示栏目编辑页
router.get('/admin/cate/editcate',(req,res)=>{
    // 1. 接收数据
    const id = req.query.id;
    // 2. 编写SQL语句
    const sql = 'select * from ali_cate where cate_id=?';
    // 3. 执行SQL语句
    db.query(sql, id ,(err,result) => {
        //4. 将查询结果显示到编辑页面上
        //参数1: 模板文件路径
        // 参数2: 要渲染到模板页上的数据 --- js/json
        res.render(path.join(rootPath, 'view/admin/cate/editcate.html'), result[0]);
    })
})


// 修改栏目信息
router.post('/admin/cate/modifycate', (req,res)=>{
    // 1. 接收数据
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon
    }
    const id = req.body.id;

    // 2. 编写SQL
    const sql = 'update ali_cate set ? where cate_id= ?';
    // 3. 执行sql语句
    db.query(sql, [data,id], (err,result)=> {
        // 4. 处理sql执行结果
        if( err || result.affectedRows !=1) {
            console.log(err);
            return res.send({code : 201 , message: "修改栏目失败"});
        }
        res.send({code:200 , message: "修改成功"});
    })
})
//导出路由模块
module.exports = router;