// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "camelCasePro" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('camelCasePro.convert', () => {

		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage("No active text editor found!");
			return;
		}

		const document = editor.document;
		let text = document.getText(editor.selection);
		if (/[A-Z]/g.test(text)) {
			text = text.replace(/([A-Z])/g, (_, letter, index) => {
				return index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`;
			})
		} else if (/_/.test(text)) {
			text = text.replace(/_(\w)/g, (_, letter) => {
				return letter.toUpperCase();
			})
		}

		editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, text);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
