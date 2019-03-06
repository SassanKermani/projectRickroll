/*==============================
=            Set Up            =
==============================*/

let fs = require(`fs`);
const bcrypt = require(`bcrypt`);
const ejs = require('ejs');

/*=====  End of Set Up  ======*/
/*=======================================
=            Cheack User Obj            =
=======================================*/
let cheackUserObj = (req)=>{
	if(req.body.userObj != undefined && req.body.userObj.username != `` && req.body.userObj.password != ``){
		return(true);
	}else{
		return(false);
	}
}
/*=====  End of Cheack User Obj  ======*/
/*==================================================
=            Turn Json String into JSON            =
==================================================*/
const parseJsonAsync = (jsonString)=>{
	return new Promise(resolve => {
		resolve(JSON.parse(jsonString))
	});
}
/*=====  End of Turn Json String into JSON  ======*/
/*===================================
=            Check Login            =
===================================*/
let checkLogin = (req)=>{

	return new Promise((resolve, reject)=>{

		console.log(`hit the function`);

		if(cheackUserObj(req) == true){
			fs.readFile(`./DB/USERS/${req.body.userObj.username}.json`, (err, data)=>{
				try{

					if (err) {throw err};

					parseJsonAsync(data).then((userObjFromDb)=>{

						try{
							bcrypt.compare(req.body.userObj.password, userObjFromDb.password, function(errr, passwordsAreGood){
								if(errr){ throw errr; }
								if(passwordsAreGood == true){

									console.log(`WOW your all good man`);
									resolve(true);

								}else{
									//password no good
									resolve(false);
									console.log(`1`)
								}
							})
						}catch(errr){
							//err in password
							resolve(false);
							console.log(`4`)

						}
					})

				}catch(err){
					//user not in db
					console.log(`2`);
					resolve(false);
				}
			});
		}else{
			//user obj no god
			resolve(false);
			console.log(`3`)
		}

	});
}

/*=====  End of Check Login  ======*/
/*======================================
=            Get All BOARDS            =
======================================*/
let getAllBOARDS = ()=>{
	return new Promise((resolve, reject)=>{
		fs.readdir(`./DB/BOARDS`, (err, files)=>{
			try{
				if(err){ throw err };
				// console.log(files);
				resolve(files);
			}catch{
				resolve(false);
			}
		})
	});
};
/*=====  End of Get All BOARDS  ======*/
/*=====================================
=            Get All Chats            =
=====================================*/
let getAllChats = ()=>{
	return new Promise((resolve, reject)=>{
																	//this is the bit we need to do stuff about
		
	})
}
/*=====  End of Get All Chats  ======*/

/*========================= FUNCTIONS ROUTS USE =========================*/

/*======================================
=            Log In Fisrt Time            =
======================================*/

let LogInFisrtTime = (req, res)=>{
	checkLogin(req).then((userGood)=>{
		if(userGood == true){

			getAllBOARDS().then((boards)=>{

				fs.readFile(`./jsANDcss/boards.js`, 'utf8', (err , data)=>{
					try{
						if(err){ throw err };

						ejs.renderFile(`./ejs/boards.ejs`, {boards : boards}, function(errr, str){
							try{
								if(errr){ throw errr };
								
								res.send({jsPage : data, ejsPage : str});

							}catch(errr){
								res.send(`5`);
							}
						})

					}catch(err){
						res.send(`6`);
					}
				});

			})

		}else{
			res.send(`7`);
		}
	});
};

/*=====  End of LogInFisrtTime  ======*/
/*----------  Exports  ----------*/
module.exports ={
	LogInFisrtTime

}