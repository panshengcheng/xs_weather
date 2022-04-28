const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx');
const request = require('request');
/**
 * 导入xslx文件
 */
router.post('/uploadXslx', async (req, res) => {
    try {
        let importFile = xlsx.parse(req.files[0].path);//获取上传文件
        let data = JSON.stringify(importFile)
        fs.writeFile("input.xlsx", data.toString(), function (err) {
            if (err) {
                throw err
            } else {
                console.log("写入成功");
                res.send("上传成功！")
            }
        })
    } catch (error) {
        throw error
    }
})
/**
 * 下载xslx文件
 */
router.get('/downloadXslx', async (req, res) => {
    try {
        request('http://www.weather.com.cn/data/sk/101110101.html', (error, response, body) => {
            if (error) {
                throw error
            } else {
                let new_xlsx = [];
                let res_body = JSON.parse(body)
                let temp = res_body.weatherinfo.temp
                let xlsx_file = fs.readFileSync('input.xlsx')
                let xlsx_json = JSON.parse(xlsx_file.toString())
                // console.log(xlsx_json)
                xlsx_json[0].data.forEach((item, index) => {
                    console.log(item)
                    if (index !== 0) {
                        item[0] = 101110101;
                        item = [...item, temp]
                    }
                    new_xlsx.push(item)
                });
                let file_name = 'output.xlsx';
                let response_xlsx = xlsx.build([{ name: file_name, data: new_xlsx }]);
                fs.writeFileSync(file_name, response_xlsx, { 'flag': 'w' });
                // res.download(file_name, response=>{
                //     console.log("下载成功"+response)
                // })
                res.send(response_xlsx)
            }
        });
    } catch (error) {
        throw error
    }
})

module.exports = router;