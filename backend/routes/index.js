var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("render");
  res.render('/public/index', { title: 'Express' });
});
router.get('/user/kakao/login', function(req, res, next) {
  let code = req.query.code;
  let url = `http://localhost:8080/#/login?code=${code}`;
  res.redirect(url);
});

module.exports = router;
