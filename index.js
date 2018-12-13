const fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

if(argv.fileprefix !== null){
	var fileprefix = argv.fileprefix;
}

function displayDir(path){
	fs.readdir(path, (error, data) => {
		if(error){
			console.log(error);
			return false;
		}
		for(var i = 0; i < data.length; i++){
			console.log("[" + i + "] : " + data[i]);
		}
		return true;
	});
}

function displayArray(array){
	if(array.length >= 0){
		for(var i = 0; i < array.length; i++){
			console.log("[" + i + "] : " + array[i]);
		}
	}else{
		console.log("Error: The array is empty!");
	}
}

fs.readdir(__dirname + '/files/', (error, data) => {
	var pdfFiles = [];
	var oldPdfFiles = [];
	
	if(error){
		console.log("ERROR: " + error);
	}

	// put all pdf files into an array that will be formatted (pdfFiles) and an array to check for changes (oldPdfFiles)
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

		if(fileprefix !== ''){
			// Get rid of all fileprefixes in the front of the names which will be added later on
			// Example:
			// OOAD - test.pdf becomes test.pdf
			while(pdfFiles[i].substring(0, fileprefix.length + 2) === fileprefix + ' -'){
				pdfFiles[i] = pdfFiles[i].substring(fileprefix.length + 3, pdfFiles[i].length);
			}	
		}		

		// if the file has lecture in its name capitalise it
		// Example:
		// lectureTest.pdf becomes LectureTest.pdf
		if(pdfFiles[i].includes('lecture')){
			pdfFiles[i] = pdfFiles[i].replace('lecture', 'Lecture');
		}

		// if the file has tutorial in its name capitalise it
		// Example:
		// tutorialTest.pdf becomes TutorialTest.pdf
		if(pdfFiles[i].includes('tutorial')){
			pdfFiles[i] = pdfFiles[i].replace('tutorial', 'Tutorial');
		}

		// swap any underscores with spaces
		// Example:
		// 'test_one.pdf' becomes 'test one.pdf'
		while(pdfFiles[i].includes('_')){
			pdfFiles[i] = pdfFiles[i].replace('_', ' ');
		}

		if(fileprefix !== ''){
			// apply formatted names to the files
			fs.rename(__dirname + '/files/' + oldPdfFiles[i], __dirname + '/files/' + fileprefix + ' - ' + pdfFiles[i], (err) => {
				if (err)
					console.log(err);
			});			
		}else{
			// apply formatted names to the files
			fs.rename(__dirname + '/files/' + oldPdfFiles[i], __dirname + '/files/' + pdfFiles[i], (err) => {
				if (err)
					console.log(err);

			});
		}
	}
	// console.log("OLD PDF FILES:");
	// displayArray(oldPdfFiles);
	// console.log("NEW PDF FILES:");
	// displayArray(pdfFiles);
	console.log('PDF Files renamed!');
});