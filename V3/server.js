/*==============================
=            Set UP            =
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

app.set('views', './ejs')
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/jsANDcss'));
app.use(morgan('dev'));

/*=====  End of Set UP  ======*/
/*=============================================
=            Section comment block            =
=============================================*/

let getStuffToBasePage = require(`./routers/getStuffToBasePage.js`);
app.use(`/get`, getStuffToBasePage);

app.get(`/*`,(req,res)=>{
	res.render(`base`);
});

/*=====  End of Section comment block  ======*/
/*----------  Listen  ----------*/
app.listen(port, function(){
	console.log("up at " + port);
})