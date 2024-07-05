/** @typedef {import('vscode')} vscode */
const vscode = require('vscode');
const parseWithTimeout = require('./lib/index');
const { configurations } = require('./extension-utils');

const handleSelection = async (parseDirection) => {
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	if (selection.isEmpty) {
		vscode.window.showErrorMessage('No text selected');
		return;
	}
	try {
		const text = editor.document.getText(selection);
		const result = await parseWithTimeout(text, 5000, parseDirection);
		editor.edit(editBuilder => {
			editBuilder.replace(selection, result);
		});
	} catch (error) {
		vscode.window.showErrorMessage(`Error: ${error.message}`);
	}
};

async function activate(context) {
	const { commands, publisher } = configurations;
	for (const [direction, commandName] of Object.entries(commands)) {
		const disposable = vscode.commands.registerCommand(
			`${publisher}.${commandName}`,
			async function() {
				await handleSelection(direction);
			});
		context.subscriptions.push(disposable);
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};