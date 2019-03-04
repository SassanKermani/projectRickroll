/*==============================
=            Set up            =
==============================*/

let fs = require(`fs`);
const bcrypt = require(`bcrypt`);

/*=====  End of Set up  ======*/


bcrypt.hash(`go`, 15, function(err, hash){
	
	if(err) throw err

	let tempVarId = `${Date.now()} : `;
	for(let i = 0; i < 100; i++){
		tempVarId+= `${(Math.floor(Math.random() * Math.floor(10)))}`
	}

	fs.writeFile(`./DB/USERS/dave.json`, JSON.stringify({

		name : `dave`,
		password : `${hash}`,
		id : `${tempVarId}`

	}), (errr)=>{
		if (errr) throw errr;
		console.log('Saved!');
	});

});