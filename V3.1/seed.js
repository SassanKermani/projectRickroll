/*==============================
=            Set up            =
==============================*/
let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

//mostly usefull for set up dirs but alos for message posting
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
	bcrypt.hash(`${password}`, 15, function(err, hash){
	
		if(err) throw err

		let dateMade = `${Date.now()}`;

		fs.writeFile(`./DB/USERS/${name.toLowerCase()}.json`, JSON.stringify({

			name : `${name.toLowerCase()}`,
			password : `${hash}`,
			date : `${dateMade}`

		}), (errr)=>{
			if (errr) throw errr;
			console.log('Saved!');
		});

	});
}
/*=====  End of Add User  ======*/
/*=====================================
=            Write Message            =
=====================================*/
let writeMessage = (name, password, messageBoard, messageObj)=>{
	cheackUserIsGood(name, password).then((userIsGood)=>{
		if(userIsGood){
			if(cheackMessageIsGood(messageObj) == true){

				fs.writeFile(`./DB/BOARDS/${messageBoard}/${new Date().getFullYear()}/${months[new Date().getMonth()]}/${new Date().getDay()}/${new Date().getTime()}-${name}.json`, JSON.stringify({
					title : `${messageObj.title}`,
					boDy : `${messageObj.body}`
				}), (err)=>{
					try{
						if(err){throw err};

						console.log(`message posted`);

					}catch(err){
						console.log(`err in posting mesage`);
					}
				});
			}else{
				console.log(`messageObj is no good`);
			}
		}else{
			console.log(`user is no good`);
		}
	})
}
/*=====  End of Write Message  ======*/
/*=========================================================
=            Read Todays Messages On One Board            =
=========================================================*/
let readTodaysMessagesOnOneBoard = ()=>{
	
}
/*=====  End of Read Todays Messages On One Board  ======*/
