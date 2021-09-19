var express = require('express')
var router = require('./router')
// import {router}  from './router.js'
var bodyParser = require('body-parser')
var session = require('express-session')//记录保持登录信息
var app = express()

// 开放公共资源
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/upload/', express.static('./upload/'))
app.use('/views/', express.static('./views/'))


// 加载express模板引擎
app.engine('html', require('express-art-template'))

// 配置body-parser模板
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({//session的配置
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(router)


app.listen(3000, () => {
    console.log('running in port 3000')
})