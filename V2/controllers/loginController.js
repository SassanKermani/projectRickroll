/*==============================
=            Set up            =
==============================*/



/*=====  End of Set up  ======*/

/*----------  Login  ----------*/
let login = (req, res)=>{
	
	console.log(req.body)

	res.send(`KO`)
}



/*==============================
=            Export            =
==============================*/

module.exports ={
	login
}

/*=====  End of Export  ======*/