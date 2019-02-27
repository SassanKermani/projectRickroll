
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

/*----------  Login CheackForAllEalse  ----------*/
let loginCehack = (req)=>{

	return new Promise((resolve, reject)=>{

		if(isUserObjOk(req) == true){
			try{
				let userFromDb = require(`../DB/USERS/${req.body.userObj.name}.json`);

				bcrypt.compare(req.body.userObj.password, userFromDb.password, (err, bcryptRess)=>{
					if(bcryptRess == true){

						console.log(`should work`);
						resolve(true);

					}else{
						resolve(false);
						// console.log(`password wrong`)
					}
				})

			}catch{
				resolve(false);
				// console.log(`user not in db`);
			}
		}else{
			resolve(false);
			// console.log(`userObj no good`);
		}

	});

}

/*----------  Get all BOARDS  ----------*/
let getAllBOARDS = ()=>{

	return new Promise((resolve, reject)=>{
		
		fs.readdir(`./DB/BOARDS`, (err, files)=>{
			
			if(err) console.log(err);
			console.log(`files`);
			console.log(files);
			console.log(files[0]);
			console.log(files[1]);
			resolve(files);

		})
	})
}

/*----------  Login Inishal  ----------*/
let login = async (req, res)=>{

	console.log(`hit login`);

	loginCehack(req).then((userAllGood)=>{
		if(userAllGood == true){

			getAllBOARDS().then((allBOARDS)=>{

				console.log(allBOARDS[0]);
				console.log(allBOARDS[1]);
				res.render(`home`, { thing : allBOARDS } );

			})
		}
	})

}


/*==============================
=            Export            =
==============================*/

module.exports ={
	login,
}

/*=====  End of Export  ======*/
