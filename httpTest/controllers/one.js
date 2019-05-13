

let controllerTest = (req, res)=>{
	res.end(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>thing</title>
		</head>
		<body>
			<p>Ok lets do this</p>
		</body>
		</html>
	`);
}



/*----------  EXPORTS  ----------*/
module.exports ={
	controllerTest
}