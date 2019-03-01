window.onload = ()=>{


	//Button
	document.getElementById(`testButton`).addEventListener(`click`, ()=>{
		getHTML();
	});

	let getHTML = ()=>{
		//XML request
		let xhttp = new XMLHttpRequest();

		//WHAT TO DO AFTER SEND
		xhttp.onreadystatechange = function(){

			console.log(`this.readyState`);
			console.log(this.readyState);

			//IF XML REQUEST WORKS
			if (this.readyState == 4 && this.status == 200) {
				
				// console.log(this.responseText);
				document.getElementById(`newBody`).innerHTML = this.responseText;

				getJS();

			}
		}

		//SET UP XML REQUEST
		xhttp.open("POST", "/testSpot", true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		//SEND XML REQUEST
		xhttp.send();
	}



	let getJS = ()=>{

		console.log(`getJS`);

		let xhttpTWO = new XMLHttpRequest();

		xhttpTWO.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {

				console.log(`xhttpTWO`);
				// console.log(this.responseText);
				let newScript = document.createElement(`script`);
				newScript.innerHTML = this.responseText;
				document.getElementsByTagName('head')[0].appendChild(newScript);

			}
		}

		xhttpTWO.open("POST", "/testSpotTwo", true);
		xhttpTWO.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xhttpTWO.send();

	}

}