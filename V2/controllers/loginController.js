/*==============================
=            Set up            =
==============================*/

let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

/*=====  End of Set up  ======*/

/*----------  Is User Obj Ok  ----------*/
let isUserObjOk = (req)=>{
	if(req.body.userObj != undefined && req.body.userObj.name != undefined && req.body.userObj.password != undefined){
		return(true)
	}else{
		return(false)
	}
}

/*----------  Login  ----------*/
let login = (req, res)=>{

	if(isUserObjOk(req) == true){
		try{
			let userFromDb = require(`${rq.userObj.name}.json`);

			bcrypt.compare(req.body.userObj.password, userFromDb.password, (err, bcryptRess)=>{
				if(bcryptRess == true){

				}else{
					// Nope
				}
			})

		}catch{
			// NOPE
		}
	}else{
		// NOPE
	}

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