/*==============================
=            Set up            =
==============================*/
let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

//mostly usefull for set up dirs but alos for message posting
let months = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december` ];
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
/*=====  End of Set up  ======*/
/*=================================
=            Set Up DB            =			//if there is a .DSstore kill it
=================================*/

let setUpDirsForYear = (yearSettingUp)=>{
	/*----------  Vars start  ----------*/

	//idorators 
	let fileThatWeAreOn = 0;
	let monthThatWeAreOne = 0;
	let dayThatWeAreOne = 0;
	let doTheYearThing = true;
	/*----------  Vars stop  ----------*/

	fs.readdir(`./DB/BOARDS/`, (err, files)=>{
		try{
			if(err){
				throw err;
			}

			let doTheRealWork = ()=>{

				let tempProm = new Promise((resolve, reject)=>{

					if(doTheYearThing == true){

						fs.mkdir(`./DB/BOARDS/${files[fileThatWeAreOn]}/${yearSettingUp}`, (errr)=>{
							try{
								if(errr){ throw errr};

								resolve(true);

							}catch(errr){
								console.log(`AYYY I BET NOTHING JUST WORKED. YOU SCREWED, GOOD LUCK`)
							}
						});

					}else{

						if( dayThatWeAreOne == 0 ){

							fs.mkdir(`./DB/BOARDS/${files[fileThatWeAreOn]}/${yearSettingUp}/${months[monthThatWeAreOne]}`, (errr)=>{
								try{
									if(errr){ throw errr };

									dayThatWeAreOne++;
									resolve(true);

								}catch(errr){
									console.log(`fileThatWeAreOn : ${fileThatWeAreOn}`);
									console.log(`errr at fs.makeder for months : ${months[monthThatWeAreOne]}`);
								}
							})
						}else{

							fs.mkdir(`./DB/BOARDS/${files[fileThatWeAreOn]}/${yearSettingUp}/${months[monthThatWeAreOne]}/${dayThatWeAreOne}`, (errr)=>{
								try{
									if(errr){ throw errr };

									dayThatWeAreOne++;
									resolve(true);

								}catch(errr){
									console.log(`errr at fs.makeder for days : ${months[monthThatWeAreOne]}, ${dayThatWeAreOne}`);
								}
							})

						}
					}
				})

				tempProm.then((doseNotreallyMatter)=>{
					if(doTheYearThing != true){
						if(dayThatWeAreOne > daysInEachMonths[monthThatWeAreOne]){
							monthThatWeAreOne++;
							dayThatWeAreOne = 0
						}

						if(monthThatWeAreOne < months.length){
							doTheRealWork();
						}else if(fileThatWeAreOn < files.length - 1){
							
							dayThatWeAreOne = 0
							monthThatWeAreOne = 0;
							fileThatWeAreOn++;
							doTheYearThing = true;

							doTheRealWork();
						}
					}else{
						doTheYearThing = false;
						doTheRealWork();
					}
				})

			}

			doTheRealWork();

		}catch(err){
			console.log(`OHHH THATS LIKE BAD, THATS REAL BAD LIKE YOUR BONED MAN`);
		}
	})

}
/*=====  End of Set Up DB  ======*/
/*===========================================
=            Cheack User Is Good            =
===========================================*/
let cheackUserIsGood = (name, password)=>{
	return new Promise((resolve, reject)=>{

		fs.readFile(`./DB/USERS/${name.toLowerCase()}.json`, `utf8`, (err, dataFromDb)=>{
			try{
				if(err){ throw err };

				parseJsonAsync(dataFromDb).then((data)=>{

					bcrypt.compare(`${password}`, `${data.password}`, function(errr, passwordIsGood){
						try{
							if(errr){ throw errr};
							if(passwordIsGood){

								resolve(`your good`);

							}else{
								console.log(`password is no good`)
								resolve(false);
							}

						}catch(errr){
							console.log(`bcrypt broke I have no idea what to do`);
							resolve(false);
						}

					})

				})

			}catch(err){
				console.log(`not a user`);
				resolve(false);
			}
		})
	})
}
/*=====  End of Cheack User Is Good  ======*/
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
			console.log(`messageObj is no good`);
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


