/*=============================
=            SetUp            =
=============================*/

let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

let dayPassLength = 100;

/*=====  End of SetUp  ======*/

/*==================================
=            Genral use            =
==================================*/

let hashPassword = (password)=>{

	let tempPromis = new Promise((resolve, reject)=>{

		bcrypt.genSalt( (err, salt)=>{
			if(err){
				console.log(`loginController.js hashPassword err`);
			}
			else{
				bcrypt.hash(`${password}`, salt, (errr, hash)=>{
					if(errr){
						console.log(`loginController.js hashPassword err`);
					}
					else{
						resolve(hash);
					}
				})
			}
		})
	});

	return tempPromis;
}

let checkPassword = (passwordFromDb, passwordFromUser)=>{

	let tempPromis = new Promise((resolve, reject)=>{

		bcrypt.compare( `${passwordFromDb}`, `${passwordFromUser}`, (err, passwordMatch)=>{
			resolve(passwordMatch);
		});

	});

	return(tempPromis);

}

let randomeDayPass = ()=>{
	let options = `abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{},./<>?;:'"`;
	
	let randStr = ``;

	for(let i = 0; i < dayPassLength; i++){
		randStr = randStr.concat();
		// `${options.charAt(  Math.floor(Math.random() * Math.floor(  options.length  )  )   }`
	}
}

/*=====  End of Genral use  ======*/


/*----------  exports  ----------*/
module.exports ={
	
}