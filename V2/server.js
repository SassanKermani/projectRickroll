/*==============================
=            Set Up            =
==============================*/

//NPM's
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 3000;

//app sutff

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views/')
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

/*=====  End of Set Up  ======*/
/*============================
=            GTFO            =
============================*/

// login 
let loginRouter = require(`./routers/loginRouter.js`);
app.use(`/login`, loginRouter);

// app.post(`/*`, (req,res)=>{
// 	console.log(`hit post`)
// 	console.log(req.body);
// })

//defult page
app.get(`/*`,(req,res)=>{
	res.render(`defult`, {test : `Test Thing`});
});

/*=====  End of GTFO  ======*/
/*----------  Listen  ----------*/
app.listen(port, function(){
	console.log("up at " + port);
})