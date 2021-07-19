const vscode = require('vscode');
const fs = require('fs');


/**
 * 修改在VSCode编辑器中打开的文档内容并且继续展示
 */
function editOpenedFileInWindow(filePath) {
	// 获取 vscode.TextDocument对象
	vscode.workspace.openTextDocument(filePath).then(doc => {
		// 获取 vscode.TextEditor对象
		vscode.window.showTextDocument(doc).then(editor => {

		});
	}).then(undefined, err => {
		console.error(err);
	});
}



function activate(context) {
	console.log("is now active")
	let relatewxmldisposable = vscode.commands.registerCommand('relatewxml', function (args) {
		const document = vscode.window.activeTextEditor.document;
		// vscode.window.showInformationMessage(document.languageId)
		const filepath = document.fileName
		var lastindex = filepath.lastIndexOf('/')
		var lastindexdot = filepath.lastIndexOf('.')
		var filedir = filepath.substring(0, lastindex)
		var filename = filepath.substring(lastindex + 1, lastindexdot)
		if (document.languageId == 'wxml') {
			target = filedir + '/' + filename + '.js'
			editOpenedFileInWindow(target)
		} else if (document.languageId == 'javascript') {
			target = filedir + '/' + filename + '.wxml'
			editOpenedFileInWindow(target)
		} else if (document.languageId == 'wxss' || document.languageId == 'css') {
			target = filedir + '/' + filename + '.js'
			editOpenedFileInWindow(target)
		}
	});
	context.subscriptions.push(relatewxmldisposable);

	let relatewxssdisposable = vscode.commands.registerCommand('relatewxss', function (args) {
		const document = vscode.window.activeTextEditor.document;
		// vscode.window.showInformationMessage(document.languageId)
		const filepath = document.fileName
		var lastindex = filepath.lastIndexOf('/')
		var lastindexdot = filepath.lastIndexOf('.')
		var filedir = filepath.substring(0, lastindex)
		var filename = filepath.substring(lastindex + 1, lastindexdot)
		if (document.languageId == 'wxml') {
			target = filedir + '/' + filename + '.wxss'
			editOpenedFileInWindow(target)
		} else if (document.languageId == 'wxss' || document.languageId == 'css') {
			target = filedir + '/' + filename + '.wxml'
			editOpenedFileInWindow(target)
		} else if (document.languageId == 'javascript') {
			target = filedir + '/' + filename + '.wxss'
			editOpenedFileInWindow(target)
		}

	});
	context.subscriptions.push(relatewxssdisposable);

	const hover = vscode.languages.registerHoverProvider('json', {
		provideHover(document, position, token) {
			const fileName = document.fileName;
			const word = document.getText(document.getWordRangeAtPosition(position));
			if (/\/package\.json$/.test(fileName) && /\bmain\b/.test(word)) {
				return new vscode.Hover("测试悬停提示");
			}
			return undefined;
		}
	});

	context.subscriptions.push(hover);

	//  const provider = vscode.languages.registerCompletionItemProvider('wxml', {
	// 	provideCompletionItems(document, position) {
	// 	    const completionItem1 = new vscode.CompletionItem('Hello World!');
	// 	    const completionItem2 = new vscode.CompletionItem('World Peace!');
	// 	    return [completionItem1, completionItem2];
	// 	}
	//     });

	//  context.subscriptions.push(provider);
}



exports.activat = activate


function deactivate() {

}


module.exports = {
	activate,
	deactivate
}