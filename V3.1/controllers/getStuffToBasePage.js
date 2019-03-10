/*==============================
=            Set Up            =
==============================*/

let fs = require(`fs`);
const bcrypt = require(`bcrypt`);
const ejs = require('ejs');

let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` ];
let daysInEachMonths = [31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let leapYearYes = ()=>{
	daysInEachMonths[1] = 29;
}
let leapYearNo = ()=>{
	daysInEachMonths[1] = 28;
}

//finds if leap year
if((new Date().getFullYear() % 4) == 0 ){
	if((new Date().getFullYear() % 100) == 0 ){
		if((new Date().getFullYear() % 400) == 0 ){
			leapYearYes();
		}else{
			leapYearNo();
		}
	}else{
		leapYearYes();
	}
}else{
	leapYearNo();
}

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
/*================================
=            Add User            =
================================*/
let addUser = (name, password)=>{

	return new Promise((resolve, reject)=>{
		
		bcrypt.hash(`${password}`, 15, function(err, hash){
			try{

				if(err) throw err

				let dateMade = `${Date.now()}`;

				fs.writeFile(`./DB/USERS/${name.toLowerCase()}.json`, JSON.stringify({

					name : `${name.toLowerCase()}`,
					password : `${hash}`,
					date : `${dateMade}`

				}), (errr)=>{
					try{
						if (errr) throw errr;
						console.log('Saved!');
						resolve(true);

					}catch(errr){
						console.log(`err is saving new user`);
						resolve(false);

					}
				});

			}catch(err){
				console.log(`bcrypt broke`);
				resolve(false);
				
			}
				

		});
	})
}
/*=====  End of Add User  ======*/
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
/*==============================================
=            Cheack Message Is Good            =
==============================================*/
let cheackMessageIsGood = (messageObj)=>{
	if(messageObj.title != undefined && messageObj.title != `` && messageObj.body != undefined && messageObj.body != `` ){
		return(true);
	}else{
		return(false);
	}
}
/*=====  End of Cheack Message Is Good  ======*/
/*=====================================
=            Write Message            =
=====================================*/
let writeMessage = (messageBoard, messageObj)=>{
	
	return new Promise((resolve, reject)=>{
		if(cheackMessageIsGood(messageObj) == true){

			fs.writeFile(`./DB/BOARDS/${messageBoard}/${new Date().getFullYear()}/${months[new Date().getMonth()]}/${new Date().getDay()}/${new Date().getTime()}-${name}.json`, JSON.stringify({
				title : `${messageObj.title}`,
				boDy : `${messageObj.body}`
			}), (err)=>{
				try{
					if(err){throw err};

					console.log(`message posted`);
					resolve(true);

				}catch(err){
					console.log(`err in posting mesage`);
					resolve(false);
				}
			});

		}else{
			console.log(`messageObj is no good`)
			resolve(false);
		}
	})
}
/*=====  End of Write Message  ======*/
/*=======================================================
=            Read A Days Messages On A Board            =	When this brakes is were it will be
=======================================================*/
let readTodaysMessagesOnOneBoard = (messageBoard, dateObj)=>{

	return new Promise((resolve, reject)=>{
		if(dateObj.year != undefined && dateObj.year != `` && dateObj.year <= new Date().getFullYear() && dateObj.month != undefined && dateObj.month != `` &&  dateObj.month >= 1 &&  dateObj.month <= 11 && dateObj.day != undefined && dateObj.day != `` && dateObj.day >= 1 && dateObj.day <= 31 ){

			fs.readdir(`./DB/BOARDS/${messageBoard}/${dateObj.year}/${months[dateObj.month]}/${dateObj.day}/`, (err, files)=>{
				try{
					if(err){ throw err };

					let resArr = [];
					files.forEach((a)=>{
						resArr.push(`./DB/BOARDS/${messageBoard}/${dateObj.year}/${months[dateObj.month]}/${dateObj.day}/${a}`)
					});

					resolve(resArr);

				}catch(err){
					console.log(`Ok what did you do? how did you manage to brake it`);
					resolve(false);
				}
			});

		}else{
			console.log(`date is no good`)
			resolve(false);
		}
	});

}
/*=====  End of Read A Days Messages On A Board  ======*/
/*===================================================
=            Get List Of Message Objects            =
===================================================*/
let getListOfMessageObjects = (arrOfMessageLocations)=>{
	return new Promise((resolveFin, rejectFin)=>{

		if(typeof arrOfMessageLocations  != Object && arrOfMessageLocations.length  != undefined){
			// console.log(`yea is arr`);

			let iterator = 0
			let resArr = [];

			doAllTheThings = ()=>{
				let tempProm = new Promise((resolve, reject)=>{
					fs.readFile(`${arrOfMessageLocations[iterator]}`, `utf8`, (err, data)=>{
						try{
							if(err){throw err };
							resolve(data);
						}catch(err){
							resolve(data)
						}
					})
				});

				tempProm.then((data)=>{
					resArr[iterator] = data;
					if(iterator < arrOfMessageLocations.length - 1){
						iterator++;
						doAllTheThings();
					}else{
						resolveFin(resArr);
					}
				})
			}

			doAllTheThings();

		}else{
			console.log(`arrOfMessageLocations is not`);
			resolveFin(false);
		}

	});
}
/*=====  End of Get List Of Message Objects  ======*/

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