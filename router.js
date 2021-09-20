var User = require('./db.js')
var express = require('express')
const multer = require('multer')
var fs = require('fs')
var router = express.Router()

router.get('/', function (req, res) {
    User.findOne({
        user: '吴灶凯'
    },function (err, ret) {
        if (err) {
            console.log('查询出错');
        } else {
            // console.log(ret);
            res.render('index.html', {
                user: ret.user,
                NFTname: ret.NFTname,
                opus:ret.opus
            })
        }
    })
    
})
router.post('/uploading', multer({ dest: 'upload' }).single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.query);
    fs.renameSync(req.file.path, 'upload/' + req.file.originalname)
    req.file.path = '/upload' + req.file.originalname
    res.send(req.file.originalname)
    User.insertMany({
        user: req.file.username,
        NFTname: req.file.ntfname,
        opus: req.file.path
    })
})
router.get('/download', (req, res) => {
    console.log(req.query)
    req.query.url ? res.download('upload/' + req.query.url) : res.send('server error')
})
module.exports = router;
