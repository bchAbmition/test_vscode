// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-p-demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-p-demo.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-p-demo!');
	});

    context.subscriptions.push(disposable);
    console.log(vscode);
	require('./helloword')(context);
	require('./webview')(context);
}
exports.activate = activate;

// this method is called when your extension is deactivated
exports.deactivate = function() {
    console.log('您的扩展“vscode-plugin-demo”已被释放！')
};

module.exports = {
	activate
}
