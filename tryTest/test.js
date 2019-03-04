
let fs = require(`fs`);

// try{

// 	fs.readFile(`./thing.json`, (err, data)=>{
// 		if (err) {throw err};

// 		console.log(`no err`);

// 	})

// }catch(err){

// 	console.log(`err`)

// }

/*----------  Subsection comment block  ----------*/

var fileContents;

fs.readFile('foo.bar', (err, data)=>{
	try{

		if(err){ throw err }

		console.log(`no err`)

	}catch(err){
		console.log(`err`)
	}
	
});
