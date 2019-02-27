
let fs = require(`fs`);
const bcrypt = require(`bcrypt`);


let chat = {
	chatId : ``,		// primary key
	userId : ``, 		// forin key
	message : ``,
	date : ``
}

/*====================================
=            Write Mesage            =
====================================*/

// let tempVarId = `${Date.now()} : `;
// for(let i = 0; i < 100; i++){
// 	tempVarId+= `${(Math.floor(Math.random() * Math.floor(10)))}`
// }
// fs.writeFile(`./DB/BOARDS/test/${tempVarId}.json`, JSON.stringify({
// 	id : `${tempVarId}`,
// 	title : `this is a test post`,
// 	message : `ok lets try this thing out and see what we can do`
// }), (err)=>{
// 	if(err) throw err;
// });

/*=====  End of Write Mesage  ======*/


/*==================================
=            write user            =
==================================*/

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

/*=====  End of write user  ======*/

// console.log(Date.now())

// let i = eval(` ()=>{
// 	console.log("thing");
// } `)

// i();

// let i = eval(`[()=>{console.log("a")}, ()=>{console.log("b")}, ()=>{console.log("c")}];`);

// i[0]();
// i[1]();
// i[2]();


/*----------  Testing stupid thig  ----------*/

// var promise1 = new Promise(function(resolve, reject) {
// 	resolve('Success!');
// });

// (async()=>{

// 	let tempVar = await promise1;

// 	console.log(tempVar);

// })();

fs.readdir(`DB/BOARDS/`, (err, files)=>{
	
	if(err) console.log(err);
	console.log(`files : ${files}`);
	console.log(files);

})
