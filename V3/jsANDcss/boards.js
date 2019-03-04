
Array.from(document.getElementsByClassName(`boardButton`)).forEach((a)=>{
	let xhttp = new XMLHttpRequest();

	console.log(`button press ${a.innerHTML}`);

	// xhttp.onreadystatechange = function(){
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		console.log(this.responseText);
			
	// 	}
	// }

	// xhttp.open("POST", "", true);												//add an endpont when we have one
	// xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	// xhttp.send(JSON.stringify({
	// 	userObj : {
	// 		username : `${username}`,
	// 		password : `${password}`
	// 	}
	// }));

});