const ejs = require('ejs');

ejs.renderFile(`./ejs/thing.ejs`, function(err, str){
	// str => Rendered HTML string
	console.log(str);
});