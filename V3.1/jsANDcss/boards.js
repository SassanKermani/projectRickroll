/*=============================
=            Setup            =
=============================*/

let username = ``;
let password = ``;

/*=====  End of Setup  ======*/

Array.from(document.getElementsByClassName(`boardButton`)).forEach((a)=>{
	
	console.log(a.textContent)
	a.onclick = ()=>{
		// console.log(`${a.textContent}`);

		username = `${document.getElementById(`username`).value}`;
		password = `${document.getElementById(`password`).value}`;

		document.getElementById(`usernameForOtherScriptFiles`).innerHTML = username;
		document.getElementById(`passwordForOtherScriptFiles`).innerHTML = password;

		if(username != `` && password != ``){

				let xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function(){
					if (this.readyState == 4 && this.status == 200) {
						console.log(typeof JSON.parse(this.responseText));
						console.log( JSON.parse(this.responseText));
					}
				}

				xhttp.open("POST", "/get/firstLogIn", true);
				xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

				xhttp.send(JSON.stringify({
					userObj : {
						username : `${username}`,
						password : `${password}`
					},
					
				}));

		}

	}

}); 