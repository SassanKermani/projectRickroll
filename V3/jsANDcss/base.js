/*=============================
=            Setup            =
=============================*/

let username = ``;
let password = ``;

/*=====  End of Setup  ======*/
window.onload = ()=>{
/*=============================
=            login            =
=============================*/

let login = ()=>{

	username = `${document.getElementById(`username`).value}`;
	password = `${document.getElementById(`password`).value}`;

	document.getElementById(`usernameForOtherScriptFiles`).innerHTML = username;
	document.getElementById(`passwordForOtherScriptFiles`).innerHTML = password;

	if(username != `` && password != ``){
		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {
				// console.log(typeof JSON.parse(this.responseText));
				// console.log( JSON.parse(this.responseText));
				let resObj = JSON.parse(this.responseText);
				document.getElementById(`BOARDS`).innerHTML = resObj.ejsPage;
				let tempScriptTag = document.createElement(`script`);
				tempScriptTag.innerHTML = resObj.jsPage;
				document.getElementsByTagName('head')[0].appendChild(tempScriptTag);
				document.getElementById(`login`).innerHTML=``;
			}
		}

		xhttp.open("POST", "/get/firstLogIn", true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xhttp.send(JSON.stringify({
			userObj : {
				username : `${username}`,
				password : `${password}`
			}
		}));
	}
	console.log(`login`);

}

document.getElementById(`firstLogIn`).addEventListener(`click`, login);

/*=====  End of login  ======*/
}