/*=============================
=            Setup            =
=============================*/

// console.log(`username : ${username}`);
let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` ];
let daysInEachMonths = [31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let year = `${new Date().getUTCFullYear()}`;
let month = `${new Date().getUTCMonth()}`;
let day = `${new Date().getUTCDate()}`;

/*=====  End of Setup  ======*/

/*===============================================
=            Read Mesages From board            =
===============================================*/
Array.from(document.getElementsByClassName(`boardButton`)).forEach((a)=>{
	
	// console.log(a.textContent)
	a.onclick = ()=>{
		
		loadOn();

		if(username != `` && password != ``){

				let xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function(){
					
					if (this.readyState == 4 && this.status == 200) {
						/*===============================================
						=            WERE THE SHIT GOSE DOWN            =
						===============================================*/
						
						loadOff();

						let messages =  JSON.parse(this.responseText);
						let tempAddStr = ``;

						// console.log(messages);

						if(messages[0] != null){
							
							for(i = messages.length; i > 0; i--){

								// console.log(i);

								let message = JSON.parse(messages[i - 1]);

								// console.log(`message`);
								// console.log(message);

								let arr = message.fileName.split(`-`)
								// console.log(arr);

								tempAddStr = tempAddStr + `<p> ${arr[1]} - ${new Date(parseInt(arr[0]))} <p> ${message.title} </p> <p> ${message.body} </p> <hr>`;
							}
							document.getElementById(`MESSAGES`).innerHTML = tempAddStr;

						}else{
							document.getElementById(`MESSAGES`).innerHTML = ``;
						}
						
						document.getElementById(`boardForOtherScriptFiles`).innerHTML = `${a.textContent.substring(1, a.textContent.length - 1)}`;
						document.getElementById(`postDiv`).removeAttribute(`hidden`);

						/*=====  End of WERE THE SHIT GOSE DOWN  ======*/
					}
				}

				xhttp.open("POST", "/get/messagesFromMessageBoard", true);
				xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

				xhttp.send(JSON.stringify({
					userObj : {
						username : `${username}`,
						password : `${password}`
					},
					board : `${a.textContent.substring(1, a.textContent.length - 1)}`,
					dateObj : {
						//OK LETS DO THIS
						year : `${year}`,
						month : `${month}`,
						day : `${day}`
					}
				}));

		}

	}
});
/*=====  End of Read Mesages From board  ======*/

/*====================================
=            Write mesage            =
====================================*/
document.getElementById(`postButton`).onclick = ()=>{
	
	loadOn();

	let xhttpTwo = new XMLHttpRequest();

		xhttpTwo.onreadystatechange = function(){
			
			if (this.readyState == 4 && this.status == 200) {
				
				/*===============================================
				=            WERE THE SHIT GOSE DOWN            =
				===============================================*/

				loadOff();

				// console.log(`this.responseText`)
				// console.log(JSON.parse(this.responseText) == true)
				// console.log(JSON.parse(this.responseText) == false)

				if(JSON.parse(this.responseText)){
					
					let newMessages =  JSON.parse(this.responseText).arrOfMessages;
					let tempAddStr = ``;

					for(i = newMessages.length; i > 0; i--){

						// console.log(i);

						let message = JSON.parse(newMessages[i - 1]);

						// console.log(message);

						let arr = message.fileName.split(`-`)
						// console.log(arr);

						tempAddStr = tempAddStr + `<p> ${arr[1]} - ${new Date(parseInt(arr[0]))} <p> ${message.title} </p> <p> ${message.body} </p> <hr>`;

					}
					document.getElementById(`MESSAGES`).innerHTML = tempAddStr;

				}else{
					// console.log(`errr fix this later`)
				}

				document.getElementById(`postTitle`).value = ``;
				document.getElementById(`postBody`).value = ``;

				/*=====  End of WERE THE SHIT GOSE DOWN  ======*/
			}
		}

		xhttpTwo.open("POST", "/get/postMessage", true);
		xhttpTwo.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xhttpTwo.send(JSON.stringify({
			userObj : {
				username : `${username}`,
				password : `${password}`
			},
			board : `${document.getElementById(`boardForOtherScriptFiles`).innerHTML}`,
			messageObj : {
				title : `${document.getElementById(`postTitle`).value}`,
				body : `${document.getElementById(`postBody`).value}`
			}
	}));
}
/*=====  End of Write mesage  ======*/
/*==================================
=            Date stuff            =											//BROKE 
==================================*/

document.getElementById(`monthsId`).onclick = ()=>{
	let tempStrForMonthsId = ``;
	for(let i = 0; i < months.length; i++){
		tempStrForMonthsId = tempStrForMonthsId + `<option value="${months[i]}" >${months[i]}</option>`
	}
	document.getElementById(`monthsId`).innerHTML = tempStrForMonthsId;
}

document.getElementById(`monthsId`).onchange = ()=>{

	let numOfDays = 0;

	console.log( daysInEachMonths[months.indexOf(document.getElementById(`monthsId`).value)] );
	if(daysInEachMonths[months.indexOf(document.getElementById(`monthsId`).value)] != undefined){

		numOfDays = daysInEachMonths[months.indexOf(document.getElementById(`monthsId`).value)];

	}else{
		if((new Date().getUTCFullYear() % 4) == 0 ){
			if((new Date().getUTCFullYear() % 100) == 0 ){
				if((new Date().getUTCFullYear() % 400) == 0 ){
					numOfDays = 29;
				}else{
					numOfDays = 28;
				}
			}else{
				numOfDays = 29;
			}
		}else{
			numOfDays = 28;
		}
	}

	let tempStrForDaysId = ``

	for(let i = 1; i <= numOfDays; i++){
		console.log(i);
		tempStrForDaysId = tempStrForDaysId + `<option value="${i}" >${i}</option>`
	}

	document.getElementById(`daysId`).innerHTML = tempStrForDaysId;
	document.getElementById(`daysId`).removeAttribute(`hidden`)
}

document.getElementById(`daysId`).onchange = ()=>{
	month = months.indexOf(document.getElementById(`monthsId`).value); //document.getElementById(`monthsId`).value;
	day = document.getElementById(`daysId`).value;

	console.log(`year : ${year} | month ${month} | day : ${day}`);
}

/*=====  End of Date stuff  ======*/
/*=================================
=            Load Ball            =
=================================*/
let loadOn = ()=>{
	document.getElementById(`loading`).classList.add(`loader`);
}

let loadOff = ()=>{
	document.getElementById(`loading`).classList.remove(`loader`);
}
/*=====  End of Load Ball  ======*/