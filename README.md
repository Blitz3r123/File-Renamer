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


