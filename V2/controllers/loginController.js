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

	// try{

	// 	let user = require(`../DB/USERS/dave.json`)
	// 	console.log(user);

	// }catch{
	// 	console.log(`oh it broke`)
	// }

	console.log(req.body);

	if(isUserObjOk(req) == true){
		try{
			let userFromDb = require(`../DB/USERS/${req.body.userObj.name}.json`);

			bcrypt.compare(req.body.userObj.password, userFromDb.password, (err, bcryptRess)=>{
				if(bcryptRess == true){

					console.log(`ya they are good`)

				}else{
					// Nope
					console.log(`password wrong`)
				}
			})

		}catch{
			// NOPE
			console.log(`user not in db`);
		}
	}else{
		// NOPE
		console.log(`userObj no good`);
	}

	res.send(`KO`);

	if(req.body.userObj != undefined);
}



/*==============================
=            Export            =
==============================*/

module.exports ={
	login,
}

/*=====  End of Export  ======*/