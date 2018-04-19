require('cloud').exemple;
var express = require('express');
var parse = require('body-parser')
var cors = require('cors');
var mysql = require('mysql');
var app = express();

app.use(cors());
//app.use(parse.json());
app.use(parse.urlencoded({extended: false}));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "psh_raw",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  });

app.post('/db_get', function(req, res, next){
    var get = "select * from psh_raw order by rid desc;";
    con.query(get, function(err, result, field){
        if(err) throw err;
        res.send(result);
    });
});

app.post('/db_enter', function(req, res, next){
    var month = req.body.monthNumber;
    var fk_user = req.body.fk_user;
    console.log(req.body);
    var arr = "select * from psh_raw where MONTH(time) = ? and direct = 1 and fk_user= ?;";
    con.query(arr, [month, fk_user], function(err, result, fields){
        console.log(result);
        res.send(result);
    });
});

app.post('/db_leave', function(req, res, next){
    var month = req.body.monthNumber;
    var fk_user = req.body.fk_user;
    console.log(req.body);
    var dep = "select * from psh_raw where MONTH(time) = ? and direct = 0 and fk_user= ?;";
    con.query(dep, [month, fk_user], function(err, result, fields){
        console.log(result);
        res.send(result);
    });
});


// Send an empty array
app.post('/db_resume', function(req, res, next){
    var resume = "select * from RECAP;";
    con.query(resume, function(err, result, fields){
        console.log(result );
        res.send(result);
    });
});


app.post('/db_final', function(req,res,next){
    var month = req.body.monthNumber;
    console.log(req.body);
    var nbHours = "select fk_user, SUM(HOUR(TIME_SPENT)) as HOURS_OF_WORK from RECAP where MONTH(ENTER) = ? group by fk_user;";
    con.query(nbHours, [month], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen(8080);
