const express = require('express');
const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//创建路由对象
const router = express.Router();

//显示 users.html 页面
router.get('/admin/user/users', (req, res) => {
    res.render(path.join(rootPath, 'view/admin/user/users.html'))
});

// 查询管理员列表
router.get('/admin/user/getUsers', (req, res) => {
    // 编写SQL语句
    const sql = 'select * from ali_admin';
    // 执行SQL语句
    db.query(sql, (err, result) => {
        if (err) {
            // console.log(err);
            return res.send({ code: 201, message: "查询列表信息失败" });
        }
        res.send({ code: 200, message: "查询列表信息成功", data: result });
    })
});

// 显示添加新管理员页面 
router.get('/admin/user/adduser', (req, res) => {
    res.render(path.join(rootPath, 'view/admin/user/adduser.html'));
});

// 添加新管理员
router.post('/admin/user/addUserDeal', (req, res) => {
    // 接受表单数据
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.password,
        admin_state: req.body.state,
        admin_addtime: moment().format('YYYY-MM-DD')
    }
    // console.log(data);
    // 编写SQL语句 
    const sql = 'insert into ali_admin set ?';
    // console.log(sql);
    // 执行SQL语句
    db.query(sql, data, (err, result) => {
        //4. 处理SQL执行结果
        if (err || result.affectedRows != 1) {
            return res.send({ code: 201, message: "添加新管理员失败" });
        }

        res.send({ code: 200, message: "添加新管理员成功" });
    })
})


// 批量删除管理员
router.post('/admin/user/delusers', (req, res) => {
    // 接受数据 -- 管理员的id值
    const ids = req.body.ids;
    // 编写SQL语句
    const sql = `delete from ali_admin where admin_id in (${ids})`;
    // 执行SQL语句
    db.query(sql, (err, result) => {
        if(err) {
            return res.send({code: 201,message: '批量删除管理员失败'})
        }
        res.send({code: 200, message: '批量删除管理员成功'})
    })

});

// 显示管理员编辑页
router.get('/admin/user/edituser', (req,res) => {
    // 接收数据 
    const admin_id = req.query.id;
    // 编写SQL语句
    const sql = 'select * from ali_admin where admin_id=?';
    // 执行sql语句
    db.query(sql,admin_id, (err, result)=>{
        // console.log(result);
        res.render(path.join(rootPath,'view', 'admin/user/edituser.html'),result[0]);
    })
})

// 修改管理员数据
router.post('/admin/user/modifyuser',(req, res) =>{
    // 接受数据
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_tel: req.body.tel,
        admin_state: req.body.state
    }
    //  console.log(data);
    const admin_id = req.body.id;
    //  console.log(admin_id);
    // 编写SQL语句
    const sql = 'update ali_admin set ? where admin_id= ?';
    // 执行SQL语句
    db.query(sql,[data,admin_id], (err,result)=>{
        if(err || result.affectedRows != 1) {
            return res.send({code: 201, message: '修改管理员信息失败'})
        }
        res.send({code: 200, message: '修改管理员信息成功'})
    })
})

module.exports = router;