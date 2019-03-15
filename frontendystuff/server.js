/*==============================
=            Set UP            =
==============================*/

//NPM's
const express = require('express');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 3000;

//app sutff

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.set('views', './ejs')
// app.engine('ejs', ejs.renderFile);
// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + './'));
app.use(morgan('dev'));

var multer  = require('multer')
var upload = multer({ dest: './' })

/*=====  End of Set UP  ======*/
/*=============================================
=            Section comment block            =
=============================================*/

app.get(`/*`,(req, res)=>{
	// res.send(`KO`);
	// res.sendFile(`./inputPage.html`)
	res.sendFile('inputPageV2.html', { root: __dirname });
});



app.post('/', upload.single('file-to-upload'), (req, res) => {
	
	res.redirect('/');

});

/*=====  End of Section comment block  ======*/
/*----------  Listen  ----------*/
app.listen(port, function(){
	console.log("up at " + port);
})