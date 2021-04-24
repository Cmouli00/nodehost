var express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql')

app = express(),
  port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({ extended: true })); 

  app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

  var mysqlconnection = mysql.createConnection({
    host:'sql6.freemysqlhosting.net',
    user:'sql6408042',
    password:'6T12ic4Gvm',
    database:'sql6408042',
    multipleStatements:true
  })

  app.get('/feed',function(req,res){
      res.sendFile(__dirname + '/index.html')
  });

  app.get('/data',function(req,res){
    mysqlconnection.query('SELECT * FROM  data',(err,rows,fields)=>{
      if(!err)
      //  res.send(rows)
      res.render('second',{data: rows})
      else
      console.log(err);
  });
  });

  app.post('/done', (req, res) => {
    mysqlconnection.query('INSERT INTO data(description,qty,rate,unit,amount,date) VALUES (?,?,?,?,?,?)',
    [req.body.description,req.body.quantity,req.body.rate,req.body.unit,req.body.amount,req.body.date],(err,rows,fields)=>{
        if(!err)
         res.send('Data added')
        else
        console.log(err);
    });

    
   });

  

app.listen(port);