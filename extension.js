// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('block-comments.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed
		let activeEditor = vscode.window.activeTextEditor;
		// let document = activeEditor.document;
		console.log(vscode.window.activeTextEditor);
		let curPos = activeEditor.selection.active;
		// console.log(curPos.line);
		// console.log(curPos.character);
		// console.log(curPos.translate.length);
		// console.log(curPos.translate.name);
		try {
			const pos = new vscode.Position(0, curPos.character);
			console.log(pos);
			// let fc = fs.readFileSync(activeEditor.document.fileName);
			// console.log(fc);
			// const edit = new vscode.WorkspaceEdit().insert(vscode.Uri.file(activeEditor.document.fileName), pos, str);
			const filename = activeEditor.document.fileName;
			console.log(filename);
			activeEditor.document.save().then(() => {

				// let fc = fs.readFileSync(filename);
				var array = fs.readFileSync(filename).toString().split("\n");
				var dash = "// ! ||";
				const totallength = 80;
				for (let j = 0; j < totallength; j++) {
					dash = dash + "-";
				}
				dash = dash + "||";

				for (let i in array) {
					if (parseInt(i) == curPos.line) {
						let  text= array[i].trim();
						let length = text.length;
						console.log("length: tlength:" + totallength + length);
						if (length == 0) {
							vscode.window.showErrorMessage("Enter Some Text");

						} else if (length >= totallength - 10) {
							vscode.window.showErrorMessage("Text is too long");
						} else {
							let left = length % 2 == 0 ? Math.round(length / 2) : Math.round(length / 2) - 1;
							let right = length % 2 == 0 ? length / 2 : Math.round(length / 2);
							let temp = text;
							let leftvalue = "// ! ||";
							let rightvalue = "";
							for (let q = 0; q < totallength / 2 - left; q++) {
								leftvalue = leftvalue + " ";
							}
							for (let q = 0; q < totallength / 2 - right; q++) {
								rightvalue = rightvalue + " ";
							}
							rightvalue += "||"
							// console.log("length :" + length);
							// console.log("l/2 :" + length / 2);
							// console.log("left :" + left);
							// console.log("right :" + right);
							// console.log("temp :" + temp);
							// console.log("lvalue :" + leftvalue);
							// console.log("rvalue :" + rightvalue);
							array[i] = dash + "\n" + leftvalue + temp + rightvalue + "\n" + dash;
							vscode.window.showInformationMessage('Comment Created Successfully');
						}
					}
// ! ||------------------------------||
// ! ||         					asdfasf         ||
// ! ||------------------------------||
					// console.log(array[i]);
				}
				fs.writeFile(filename, array.join("\n"), function (err) {
					if (err) {
						console.error(err);
						console.log("we have some error while writing file");
					}
					console.log("don it");
					return;
				});
			});

			// let succ = await vscode.workspace.applyEdit(edit);
		} catch (error) {
			console.error(error);
			console.log("we are in catch block");
		}
		// let t = vscode.workspace.applyEdit(edit);
		// new vscode.Selection(activeEditor.selection[],curPos.character);
		// console.log(curPos["character"]);
		// console.log(curPos["line"]);

		// let offset = document.offsetAt(curPos);
		// console.log(offset);
		// Display a message box to the user
		// vscode.window.showInformationMessage('!!!!  TRY  NEW	!!!!! Sanchit pc', );
	});

	context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}