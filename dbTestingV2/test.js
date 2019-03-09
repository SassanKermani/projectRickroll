/*==============================
=            Set Up            =
==============================*/

let fs = require(`fs`);


/*=====  End of Set Up  ======*/
/*======================================================
=            Set Up Mesage Folder For a Bit            =				//fix to hit all folders in db
======================================================*/
let makeDir = ()=>{

	console.log(`hit makeDir`)

	/*----------  Vars start  ----------*/
	
	let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` ];
	let daysInEachMonths = [31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	let leapYearYes = ()=>{
		daysInEachMonths[1] = 29;
	}
	let leapYearNo = ()=>{
		daysInEachMonths[1] = 28;
	}

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

	let fileThatWeAreOne = 0;
	let yearSettingUp = 2019;
	let monthThatWeAreOne = 0;
	let DayThatWeAreOne = 0;
	/*----------  Vars stop  ----------*/

	fs.readdir(`./DB/BOARDS/`, (err, files)=>{

		console.log(`read BOARDS`)

		try{
			if(err){
				throw err;
			}

			let doTheRealWork = ()=>{

				let tempProm = new Promise((resolve, reject)=>{

					if( DayThatWeAreOne == 0 ){

						fs.mkdir(`./DB/BOARDS/${files[fileThatWeAreOne]}/${months[monthThatWeAreOne]}`, (errr)=>{
							try{
								if(errr){ throw errr };

								DayThatWeAreOne++;
								resolve(true);

							}catch(errr){
								console.log(`errr at fs.makeder for months : ${months[monthThatWeAreOne]}`);
							}
						})
					}else{

						fs.mkdir(`./DB/BOARDS/${files[fileThatWeAreOne]}/${months[monthThatWeAreOne]}/${DayThatWeAreOne}`, (errr)=>{
							try{
								if(errr){ throw errr };

								DayThatWeAreOne++;
								resolve(true);

							}catch(errr){
								console.log(`errr at fs.makeder for days : ${months[monthThatWeAreOne]}, ${DayThatWeAreOne}`);
							}
						})

					}

				})

				tempProm.then((doseNotreallyMatter)=>{
					if(DayThatWeAreOne > daysInEachMonths[monthThatWeAreOne]){
						monthThatWeAreOne++;
						DayThatWeAreOne = 0
					}

					if(monthThatWeAreOne < months.length){
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

makeDir();

/*=====  End of Set Up Mesage Folder For a Bit  ======*/
/*====================================
=            GenralPurpus            =
====================================*/

/*----------  Parse Json Async  ----------*/
const parseJsonAsync = (jsonString)=>{
	return new Promise(resolve => {
		resolve(JSON.parse(jsonString))
	});
}

/*=====  End of GenralPurpus  ======*/
/*====================================
=            DB functions            =
====================================*/

/*----------  Get A User  ----------*/
let getAUser = (nameOfUser)=>{
	
	return new Promise((resolve, reject)=>{
		fs.readFile(`./DB/USERS/${nameOfUser}`, `utf8`, (err, userData)=>{
			try{
				if(err){
					throw err
				}

				resolve(userData);

			}catch(err){
				resolve(false)
			}
		})
	})
}

/*----------  See All Boards  ----------*/
let seeAllBoards = ()=>{
	return new Promise((resolve, reject)=>{
		fs.readdir(`./DB/BOARDS`, (err, files)=>{
			try{
				if(err){
					throw err;
				}

				resolve(files);

			}catch(err){
				resolve(false);
			}
		})
	})
}



/*=====  End of DB functions  ======*/
