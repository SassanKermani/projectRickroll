/*==============================
=            Set up            =
==============================*/

let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

/*=====  End of Set up  ======*/


// bcrypt.hash(`go`, 15, function(err, hash){
	
// 	if(err) throw err

// 	let tempVarId = `${Date.now()} : `;
// 	for(let i = 0; i < 100; i++){
// 		tempVarId+= `${(Math.floor(Math.random() * Math.floor(10)))}`
// 	}

// 	fs.writeFile(`./DB/USERS/dave.json`, JSON.stringify({

// 		name : `dave`,
// 		password : `${hash}`,
// 		id : `${tempVarId}`

// 	}), (errr)=>{
// 		if (errr) throw errr;
// 		console.log('Saved!');
// 	});

// });

/*---------------------------------------------------------------------------*/

// let start = new Date().getTime()

let getRandStr = ()=>{
	let returnStr = ``;
	for(let i = 0; i < 100; i++){
		// console.log(i);
		returnStr =`${returnStr}${Math.floor(Math.random() * Math.floor(10))}`;
	}
	return(returnStr);
	// console.log(returnStr);
}

let tempVarI = 0;

let doThing = ()=>{

	let timeTestFuntion = new Promise((resolve, reject)=>{

		// resolve(`ok`);

		// fs.readFile(`./thing.json`, 'utf8', (err, data)=>{

		// 	// console.log(tempVarI);
		// 	// console.log(data);
		// 	resolve(data);
		// })

		let d = new Date();

		// console.log(`${d.getFullYear()}:${d.getMonth()}:${d.getDate()}:${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`);

		let id = `./DB/BOARDS/GLOBAL-CATASTROPHIC-RISK/${d.getFullYear()}:${d.getMonth()}:${d.getDate()}:${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}-${getRandStr()}.json`;

		// let id = `./DB/BOARDS/GLOBAL-CATASTROPHIC-RISK/${d.getFullYear()}:${d.getMonth()}:${d.getDate()}:${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}.json`;

		// console.log(id);

		fs.writeFile(`${id}`, JSON.stringify({

			title : `01234567890123456789012345678901234567890123456789`,
			post : `01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789`,
			id : `${new Date().getTime()} : 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789`

		}), (err)=>{
			if(err){
				throw err;
				console.log(err)
			}
			resolve(`KO`);
		})		

	});

	timeTestFuntion.then((a)=>{

		console.log(`hit the then`);

		tempVarI++;

		console.log(tempVarI);
		console.log(tempVarI < 5);

		if(tempVarI < 50){

			doThing();

		}else{

			// console.log(``);
			// console.log(``);
			// let end = new Date().getTime();
			// let time = end - start;
			// console.log( time / 1000 );

		}

	});
}


doThing();


/*---------------------------------------------------------------------------*/

// let TestNumber = 0;

// fs.readdir(`./DB/BOARDS/GLOBAL-CATASTROPHIC-RISK`, (err, files)=>{
// 	if(err){ throw err;}

// 	// console.log(files.length);

// 	for(let i = 1; i < files.length; i++){
// 		// console.log(`i : ${i}`);

// 		for(let ii = 0; ii < i; ii++){
// 			// console.log(`ii : ${ii}`);

// 			TestNumber++;

// 			if(files[i] <= files[ii]){
// 				console.log(`files[i] : ${files[i]}`)
// 				console.log(`files[ii] : ${files[ii]}`)
// 				console.log(`OH THIS THIS IS NOT WHAT WAS SUPOSED TO HAPEN`);
// 			}else{
// 				// console.log(`ITS ALL GOOD`);
// 			}
// 		}
// 	}
	
// 	console.log(`done`);

// 	let tempVarForCheackingStuff = 0;

// 	for(let i = 1; i < 1000; i++){

// 		for(let ii = 0; ii < i; ii++){

// 			tempVarForCheackingStuff++;

// 		}
// 	}

// 	console.log(`tempVarForCheackingStuff : ${tempVarForCheackingStuff}`);

// 	console.log(`TestNumber : ${TestNumber}`);

// 	console.log(tempVarForCheackingStuff == TestNumber);

// })


