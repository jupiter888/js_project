var express = require('express');
const db = require("../models/database");
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  res.setHeader( 'Access-Control-Allow-Headers', '*')

  let select_query = 'SELECT * FROM materials'
  let student = req.session.student
  db.all(select_query, function (err, response) {
    if (err){
      console.log(err)
    }

    return res.render('index', {material: response, student:student})
  })
});

router.post('', function(req, res, next) {
  console.log(req.body)

});

module.exports = router;
