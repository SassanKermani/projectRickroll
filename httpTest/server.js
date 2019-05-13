/*==============================
=            Set Up            =
==============================*/

const http = require(`http`);
const one = require(`./controllers/one.js`)

/*=====  End of Set Up  ======*/

const server = http.createServer((req, res)=>{

	switch(req.url){
		
		case `/test`:
			one.controllerTest(req, res);
			break;

		default:
			res.end(`${req.url} is not an endpoint`);
	}

});server.listen(3000);