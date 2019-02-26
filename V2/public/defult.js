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
			
			xhttp.open("POST", "/login", true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

			xhttp.send(JSON.stringify({
				"username" : document.getElementById(`username`).value,
				"password" : document.getElementById(`password`).value
			}));

		}
	}

	

}
