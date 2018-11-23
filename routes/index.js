var express = require('express');
var router = express.Router();
var Heroes = require('../models/hero');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Heroes Name' });
});

router.get('/saveData', function(req, res, next) {
	Heroes.saveNew(req.query)
	.then(function(){
	res.redirect('/getAllHeroes')
})
	.catch(console.log('ERR :: err in resolving the promice'))
});

router.get('/deleteRow', function(req, res, next) {
	Heroes.deleteRow(req.query)
	.then(function(){
	res.redirect('/getAllHeroes')
})
	.catch(console.log('ERR :: err in resolving the promice'))
});
router.get('/viewRow', function(req, res, next) {
	Heroes.viewRow(req.query)
	.then(function(retVal){
		//res.send(retVal);
		 res.render('singleData',{data:retVal})
	})
	.catch(console.log('ERR :: err in resolving the promice'))
});
router.get('/getAllHeroes',function(req,res,next){
	Heroes.getAll()
	.then(function(retVal){
	res.render('heros', {data:retVal})
})
	.catch(console.log('ERR :: in resolving the promice'))
});

module.exports = router;
