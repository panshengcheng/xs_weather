const express = require('express');
const files = require('./routes/files.js');
const multer = require('multer');
const app =new express()
const prot = 3000;
app.all('*',(req, res, next)=>{
    // res.header("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:8080');
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next()
})
app.use(multer({dest:'./uploads'}).any())
app.use('/file',files);//文件上传下载
app.get("/", (req, res)=>{
    res.send("面试DEMO")
})

app.listen(prot, ()=>{
    console.log(`启动${prot}端口`)
})