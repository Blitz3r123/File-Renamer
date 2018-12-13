# File Renamer
This is basically a script that makes your filenames nice and tidy.

## How to use:
1. Run `git clone https://github.com/Blitz3r123/file-renamer`
2. Run `cd file-renamer`
3. Run `npm install` to install all dependencies
4. Place all files that need to be renamed into the 'files' folder
5. Run `node index.js`
6. If you want to add a file prefix to all the names just run `node index.js --fileprefix=[enter file prefix here]` instead of the above code

## Features:
- Gets rid of (1)s at the end of files when they are duplicated in windows.
- Only affects pdf files
- Has the option to take in the argument 'fileprefix' when running the node script which will be added to all file names
- Capitalises the words Lecture and Tutorial

## Explanation of the code:
`const fs = require('fs');`

Here I am using the file system module from Node.js to work on files.

`var argv = require('minimist')(process.argv.slice(2));`

This is line of code is for taking in the arguments when executing the script.

```
if(argv.fileprefix !== null){
	var fileprefix = argv.fileprefix;
}
```

Here I am just checking if the user has passed an argument for the fileprefix argument.

```
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

```

This function basically just displays whats in the directory of the path passed as an argument.

```
function displayArray(array){
	if(array.length >= 0){
		for(var i = 0; i < array.length; i++){
			console.log("[" + i + "] : " + array[i]);
		}
	}else{
		console.log("Error: The array is empty!");
	}
}
```

This function displays the contents of an array passed to it as an argument.

```
fs.readdir(__dirname + '/files/', (error, data) => {
```

Welcome to the meat of this script!

```
var pdfFiles = [];
var oldPdfFiles = [];
```

Just creating two arrays. One to store all the pdf files and another to view changes made to these files.

```
for(var i = 0; i < data.length; i++){
		if(data[i].slice(-4) === '.pdf'){
			pdfFiles.push(data[i]);
			oldPdfFiles.push(data[i]);
		}
	}
```

Here the files are being copied to both arrays. Also, there is validation here to check that the files are pdf.

`for(var i = 0; i < pdfFiles.length; i++){`

Entering this for loop enters the formatting of the file names.

```
var regex = /\([0-9]\)/;
if(regex.test(pdfFiles[i])){
	var startIndex = pdfFiles[i].indexOf('(');
	pdfFiles[i] = pdfFiles[i].substring(0, startIndex) + '.pdf';
}
```

Creating a regular expression to check for a ( followed by a number followed by a ). This piece of code then checks where the regular expression is found and deletes it. Bare in mind, if (1) was found in the middle of the name everything after the (1) would be deleted.

```
if(fileprefix !== ''){
	while(pdfFiles[i].substring(0, fileprefix.length + 2) === fileprefix + ' -'){
		pdfFiles[i] = pdfFiles[i].substring(fileprefix.length + 3, pdfFiles[i].length);
	}	
}		
```

Here the files are checked for the fileprefix so that it isn't duplicated when the file prefix is added later.

```
if(pdfFiles[i].includes('lecture')){
	pdfFiles[i] = pdfFiles[i].replace('lecture', 'Lecture');
}
if(pdfFiles[i].includes('tutorial')){
	pdfFiles[i] = pdfFiles[i].replace('tutorial', 'Tutorial');
}
```

Here, it's pretty self explanatory, the words lecture and tutorial are being replaced by capitalised versions of the words.

```
while(pdfFiles[i].includes('_')){
	pdfFiles[i] = pdfFiles[i].replace('_', ' ');
}
```

Here all underscores are replaced with a space.

```
if(fileprefix !== ''){
	fs.rename(__dirname + '/files/' + oldPdfFiles[i], __dirname + '/files/' + fileprefix + ' - ' + pdfFiles[i], (err) => {
		if (err)
			console.log(err);
	});			
}else{
	fs.rename(__dirname + '/files/' + oldPdfFiles[i], __dirname + '/files/' + pdfFiles[i], (err) => {
		if (err)
			console.log(err);
	});
}
```

This is where all the renaming takes place.