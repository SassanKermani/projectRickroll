/*=============================
=            Setup            =
=============================*/

console.log(`username : ${username}`);

/*=====  End of Setup  ======*/

Array.from(document.getElementsByClassName(`boardButton`)).forEach((a)=>{
	
	// console.log(a.textContent)
	a.onclick = ()=>{
		
		console.log(`${a.textContent}`);

		// console.log(`username : ${username}`);

		if(username != `` && password != ``){

				let xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function(){
					if (this.readyState == 4 && this.status == 200) {
						/*===============================================
						=            WERE THE SHIT GOSE DOWN            =
						===============================================*/
						
						let messages =  JSON.parse(this.responseText);
						let tempAddStr = ``;

						// console.log(messages);

						if(messages[0] != null){
							
							for(i = messages.length; i > 0; i--){

								// console.log(i);

								let message = JSON.parse(messages[i - 1]);

								// console.log(message);

								tempAddStr = tempAddStr + `<p> ${message.title} </p> <p> ${message.body} </p> <hr>`;
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
					board : `${a.textContent.substring(1, a.textContent.length - 1)}`
				}));

		}

	}

});

document.getElementById(`postButton`).onclick = ()=>{

	console.log(`title`);
	console.log(`${document.getElementById(`postTitle`).value}`);

	console.log(`body`);
	console.log(`${document.getElementById(`postBody`).value}`);

	let xhttpTwo = new XMLHttpRequest();

		xhttpTwo.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {
				
				/*===============================================
				=            WERE THE SHIT GOSE DOWN            =
				===============================================*/

				if(this.responseText){
					
					let newMessages =  JSON.parse(this.responseText).arrOfMessages;
					let tempAddStr = ``;

					for(i = newMessages.length; i > 0; i--){

						// console.log(i);

						let message = JSON.parse(newMessages[i - 1]);

						// console.log(message);

						tempAddStr = tempAddStr + `<p> ${message.title} </p> <p> ${message.body} </p> <hr>`;

					}
					document.getElementById(`MESSAGES`).innerHTML = tempAddStr;

				}else{
					// console.log(`errr fix this later`)
				}

				document.getElementById(`postTitle`).value = ``;
				document.getElementById(`postBody`).innerHTML = ``;

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

