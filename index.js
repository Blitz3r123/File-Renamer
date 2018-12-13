const fs = require('fs');

fs.readdir(__dirname + '/files/', (error, data) => {
	var pdfFiles = [];
	var oldPdfFiles = [];
	if(error){
		console.log("ERROR: " + error);
	}
	// put all pdf files into an array
	for(var i = 0; i < data.length; i++){
		if(data[i].slice(-4) === '.pdf'){
			pdfFiles.push(data[i]);
			oldPdfFiles.push(data[i]);
		}
	}

	// do whatever needs to be done to pdf files
	for(var i = 0; i < pdfFiles.length; i++){
		// remove any numbers in brackets at the end of the name of the file
		// for example:
		// test(1).pdf will become test.pdf
		var regex = /\([0-9]\)/;
		if(regex.test(pdfFiles[i])){
			var startIndex = pdfFiles[i].indexOf('(');
			pdfFiles[i] = pdfFiles[i].substring(0, startIndex) + '.pdf';
		}

		// Get rid of all OOAD - in the front of the names
		// Example:
		// OOAD - test.pdf becomes test.pdf
		while(pdfFiles[i].substring(0, 6) === 'OOAD -'){
			pdfFiles[i] = pdfFiles[i].substring(7, pdfFiles[i].length);
		}

		// apply formatted names to the files
		// fs.rename(__dirname + '/files/' + oldPdfFiles[i], __dirname + '/files/OOAD - ' + pdfFiles[i], (err) => {
		// 	if (err)
		// 		console.log(err);

		// 	console.log('PDF Files renamed!');
		// });
	}
});