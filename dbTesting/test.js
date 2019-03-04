// var start = new Date()
// var hrstart = process.hrtime()
// var simulateTime = 5

// setTimeout(function(argument) {
// 	// execution time simulated with setTimeout function
// 	var end = new Date() - start,
// 		hrend = process.hrtime(hrstart)

// 	console.info('Execution time: %dms', end)
// 	console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
// }, simulateTime)

/*------------------------------------------------------------------------------------------*/


// let hrstart = process.hrtime();
// hrend = process.hrtime(hrstart);

// let fs = require(`fs`);

// // try{
// // 	let oldTest = require(`./json.json`);
// // }catch{

// // }

// try{
// 	fs.readFile('./json.json', (err, data) => {
// 		if (err) throw err;
// 		let oldTest = data;
// 	});
// }catch{

// }


// console.log(`${hrend[0]}'s : ${hrend[1]/1000000}ms`);

/*------------------------------------------------------------------------------------------*/

let requireMethod = ()=>{
	return(new Promise((resolve, reject)=>{

		let hrstart = process.hrtime();
		hrend = process.hrtime(hrstart);

		try{
			let oldTest = require(`./json.json`);
			// console.log(oldTest);
			resolve(`${hrend[0]}'s : ${hrend[1]/1000000}ms`);
		}catch{

		}

	}));
}

let fsModualMethod = ()=>{
	return(new Promise((resolve, reject)=>{

		let hrstart = process.hrtime();
		hrend = process.hrtime(hrstart);

		try{

			let fs = require(`fs`);

			fs.readFile('./json.json', 'utf8', (err, data) => {
				if (err) throw err;
				let oldTest = data;
				// console.log(data);
				resolve(`${hrend[0]}'s : ${hrend[1]/1000000}ms`);
			});
		}catch{

		}

	}));
}

requireMethod().then((a)=>{
	console.log(`requireMethod : ${a}`);
});

fsModualMethod().then((a)=>{
	console.log(`fsModualMethod : ${a}`);
});
