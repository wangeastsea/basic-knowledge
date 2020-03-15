var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')

var uploading = multer({
  dest: __dirname + '../public/uploads/',
  // 设定限制，每次最多上传1个文件，文件大小不超过1MB
  limits: {
    fileSize: 10000000,
    files: 1
  }
})

router.post('/upload', uploading, function (req, res) {
})

module.exports = router