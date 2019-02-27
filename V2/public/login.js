/*==============================
=            Set UP            =
==============================*/

let userName = ``;
let pass = ``

/*=====  End of Set UP  ======*/


window.onload = function () {

	var xhttp = new XMLHttpRequest();


	window.onkeyup = function(e) {
		
		if(e.keyCode == 13){
			login();
		}
	}

	// log in
	let login = ()=>{
		if(document.getElementById(`username`).value != "" && document.getElementById(`password`).value != ""){

			userName = document.getElementById(`username`).value;
			password = document.getElementById(`password`).value;
						
			xhttp.onreadystatechange = function(){

				console.log(`this.readyState`);
				console.log(this.readyState);

				if (this.readyState == 4 && this.status == 200) {
					console.log(`ok it was sent back ok at least`);
					console.log(this.responseText);
					document.getElementById(`page`).innerHTML = this.responseText;
				}
			}

			xhttp.open("POST", "/login/inishal", true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

			xhttp.send(JSON.stringify({
				"userObj" : {

					"name" : userName,
					"password" : password
					
				}
			}));

		}
	}

	

}
