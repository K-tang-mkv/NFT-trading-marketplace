
var express = require('express')
const multer = require('multer')
var fs = require('fs')
var router = express.Router()
//var User = require('./db.js')
router.get('/', function (req, res) {
    // User.findOne({
    //     user: '吴灶凯'
    // },function (err, ret) {
    //     if (err) {
    //         console.log('查询出错');
    //     } else {
    //         // console.log(ret);
    //         res.render('index.html', {
    //             user: ret.user,
    //             NFTname: ret.NFTname,
    //             opus:ret.opus
    //         })
    //     }
    // })
    res.render('index.html');
})
router.post('/upload', multer({ dest: 'upload' }).single('file'), (req, res) => {
    console.log(req.file)
    fs.renameSync(req.file.path, 'upload/' + req.file.originalname)
    req.file.path = '/upload' + req.file.originalname
    res.send(req.file.originalname)
})
router.get('/download', (req, res) => {
    console.log(req.query)
    req.query.url ? res.download('upload/' + req.query.url) : res.send('server error')
})
module.exports = router;
