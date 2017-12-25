var sys = require('sys');
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

var spawn = require("child_process").spawn;
var exec = require('child_process').exec;

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
	var exec = require('child_process').exec;
	//python3 /home/tronmedi/Tron2017_top/AI_diagnose/run_tron_detection.py --image_path '/home/tronmedi/Tron2017_top/AI_diagnose/New_test_img/12.bmp'
	//python3 run_tron_detection.py --image_path 'New_test_img/12.bmp'
	exec("python3 /home/tronmedi/Tron2017_top/AI_diagnose/run_tron_detection.py --image_path '/home/tronmedi/Tron2017_top/AI_diagnose/New_test_img/11.bmp'",function(error,stdout,stderr){
		if(stdout.length >1){
			//console.log('you offer args:',stdout);
		} else {
			//console.log('you don\'t offer args');
		}
		if(error) {
			console.info('stderr : '+stderr);
		}
	});
	
	/*
    console.log(req.file.filename);
    var child = spawn('python3',["run_tron_detection_json.py", '--image_path', './uploads/' + req.file.filename, '--save_path', './uploads/'], {
      cwd: '/home/tronmedi/imageUpload'
    });
	*/

    return res.render('index', {
      message: 'Upload success',
      imagePath: '/' + req.file.filename
    });
  }
});


module.exports = router;
