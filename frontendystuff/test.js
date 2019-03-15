// function urlify(text) {
	// var urlRegex = /(https?:\/\/[^\s]+)/g;
	
// 	// return text.replace(urlRegex, function(url) {
// 	// 	return '<a href="' + url + '">' + url + '</a>';
// 	// })
// 	// or alternatively
// 	return text.replace(urlRegex, '<a href="$1">$1</a>')
// }

// var text = "Find me at http://www.example.com and also at http://stackoverflow.com";
// var html = urlify(text);

// console.log()
// console.log()
// console.log(html)
// console.log()
// console.log()

/*----------  ------------------------  ----------*/

// var str = "How are you doing today?";
// var res = str.split(" ");

// console.log(res);

/*----------  ------------------------  ----------*/

let findUrl = (str)=>{
	
	let arr = str.split(" ");

	// console.log(arr);

	for(let i = 0; i < arr.length; i++){

		console.log(i);

		if(arr[i].match(/(https?:\/\/[^\s]+)/g)){
			console.log(true);
		}else{
			console.log(false);
		}
		

	}
}

findUrl(`ok let do this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match`);

/*----------  ------------------------  ----------*/


