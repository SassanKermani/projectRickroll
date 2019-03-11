/*=============================
=            Setup            =
=============================*/

console.log(`username : ${username}`);

/*=====  End of Setup  ======*/

Array.from(document.getElementsByClassName(`boardButton`)).forEach((a)=>{
	
	// console.log(a.textContent)
	a.onclick = ()=>{
		
		console.log(`${a.textContent}`);

		console.log(`username : ${username}`);

		if(username != `` && password != ``){

				let xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function(){
					if (this.readyState == 4 && this.status == 200) {
						console.log(typeof JSON.parse(this.responseText));
						console.log( JSON.parse(this.responseText));
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