var express = require('express');
var router = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
 
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Upload' });
});

router.get('/image/upload', function (req, res, next) {
  res.render('index', { title: 'Image Upload' });
});

router.post('/image/upload', upload.single('image'), function (req, res, next) {
  // req.file is the `image` file 
  // req.body will hold the text fields, if there were any 
  if (!req.file) {
    return res.render('index', {
      message: 'No image received',
    });
  } else {
    // add python command here
    return res.render('index', {
      message: 'Upload success',
      imagePath: '/' + req.file.filename
    });
  }
});


module.exports = router;
