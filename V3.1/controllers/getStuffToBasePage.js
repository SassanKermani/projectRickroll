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
/*==========================================================
=            Get Last Hundered Chats On A Board            =				//needs some fixing
==========================================================*/
let getLastHunderedChatsOnABoard = (boardName)=>{

	// console.log(`hit getLastHunderedChatsOnABoard`);

	let fileNumber = 0;
	let maxNumberOfFilesReading = 99;
	let arrOfChats = [];

	return new Promise((finResolve, finReject)=>{

		fs.readdir(`./Db/BOARDS/${boardName}`, (err, files)=>{
			try{
				if(err){ throw err };

				// console.log(`files`);
				// console.log(files);


				if(files.length > 100){
					maxNumberOfFilesReading = 99;
				}else{
					maxNumberOfFilesReading = files.length - 1;
				}

				let doStuff = ()=>{

					// console.log(`doStuff`);

					let tempPromis = new Promise((strResolve, strReject)=>{
						fs.readFile(`./Db/BOARDS/${boardName}/${files[ files.length - (maxNumberOfFilesReading - fileNumber) - 1]}`, `utf8`, (errr, data)=>{
							try{
								if(errr){ throw errr };

								strResolve(data)

							}catch(errr){
								console.log(`9`);
								fileNumber++;
								// FIGURE THIS OUT LATER
							}
						})
					})

					tempPromis.then((stuff)=>{
						// console.log(`tempPromis.then`);

						arrOfChats[fileNumber] = stuff;
						fileNumber++;

						if(fileNumber <= maxNumberOfFilesReading){

							doStuff();
						}else{

							finResolve(arrOfChats);
						}

					})

				}

				doStuff();

			}catch(err){
				console.log(`8`);
				// FIGURE THIS OUT LATER
			}
		})

	})
}
getLastHunderedChatsOnABoard(`GLOBAL-CATASTROPHIC-RISK`).then((a)=>{
	console.log(a.length);
})
/*=====  End of Get Last Hundered Chats On A Board  ======*/
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