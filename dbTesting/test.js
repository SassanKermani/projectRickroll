
let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

/*==================================
=            Write File            =
==================================*/

// let WiteFileName = `thing.txt`;

// let WiteFileObj = `
// 	test : "test",
// 	testTwo : ["test", "test", "test"],
// 	testThree : {
// 		test : "test thing"
// 	}
// `;

// fs.writeFile(WiteFileName, WiteFileObj, function (err) {
// 	if (err) throw err;
// 	console.log('Saved!');
// });

/*=====  End of Write File  ======*/

/*=======================================
=            see files in db            =
=======================================*/

// let path = `./db`

// fs.readdir(path, (err, files)=>{
// 	if(err) throw err;
// 	console.log(files);
// });

/*=====  End of see files in db  ======*/

/*=================================
=            Read File            =
=================================*/

// let readFileName = `thing.txt`;

// fs.readFile(readFileName, `utf8`, (err, data)=>{
// 	if(err) throw err;
// 	// console.log(data);
// 	console.log(JSON.parse(`{ ${data} }`));
// });

/*=====  End of Read File  ======*/

/*==============================
=            Update            =
==============================*/

// let updateFileName = `thing.txt`;

// fs.appendFile(updateFileName, `, "cool-lets-do-this-thing" : "this is a test man",`, (err)=>{
// 	if(err) throw err;
// });

/*=====  End of Update  ======*/

/*===================================
=            bcrypt Test            =
===================================*/

// let password = `password`;

// bcrypt.hash(password, 10, function(err, hash) {
	
// 	console.log(hash);

// 	bcrypt.compare(password, hash, function(err, res) {
// 		if(err) throw err;
// 		console.log(`password ${res}`);
// 	});

// 	bcrypt.compare(`not password`, hash, function(err, res) {
// 		if(err) throw err;
// 		console.log(`not password  ${res}`);
// 	});

// });

/*=====  End of bcrypt Test  ======*/
