var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/NFT')

var userschema = mongoose.Schema ({
    user: {
        type: String,
        required:true
    },
    NFTname: {
        type:String
    },
    opus: {
        type: String
    }
})
// var NFT = mongoose.model('NFT', userschema)
module.exports = mongoose.model('NFT', userschema)

// new NFT({
//     user: '吴灶凯',
//     NFTname:'god',
//     opus: '/upload/鸣佐.jpeg'
// }).save(function (err, ret) {
//     if (err) {
//         console.log('failed');
//     } else {
//         console.log('success');
//         console.log(ret);
//     }
// })

// NFT.find(function (err, ret) {
//     if (err) {
//         console.log('failed')
//     } else {
//         console.log(ret);
//     }
// })
// User.findOne({
//     user:'翁梓鹏'
// }, function (err, ret) {
//     if (err) {
//         console.log('failed')
//     } else {
//         console.log(ret);
//     }
// })

// User.remove({
//     user:'吴灶凯'
// }, function (err, ret) {
//     if (err) {
//         console.log('干的漂亮');
//     } else {
//         console.log('good job');
//         console.log(ret);
//     }
// })

// User.findByIdAndUpdate('6144434b5110c29c4516e3db', {
    
// }, function (err, ret) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('success');
//         console.log(ret);
//     }
// })

