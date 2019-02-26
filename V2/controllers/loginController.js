/*==============================
=            Set up            =
==============================*/



/*=====  End of Set up  ======*/

/*----------  Cheack userObj  ----------*/
let cheackUserObj = ()=>{
	
}

/*----------  Login  ----------*/
let login = (req, res)=>{

	console.log(req.body.userObj != undefined);

	res.send(`KO`);

	// if(req.body.userObj != undefined);
}



/*==============================
=            Export            =
==============================*/

module.exports ={
	login,
}

/*=====  End of Export  ======*/