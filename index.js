/*eslint-disable no-unused-vars*/

const dlg = document.querySelector('#sample-dialog');
//Escによるキャンセルをさせない
dlg.addEventListener('cancel', (event) => {
	'use strict';
	event.preventDefault();
});

function showModalDialogElement() {
	'use strict';

	return new Promise((resolve, reject) => {
		dlg.showModal();

		function onClose(event) {
			// 2017/2/5現在Chromium:v54のためaddEventListenerの{once: true}は利用できないため自力で解放。v55になれば{once: true}を利用するのが良いと思います。
			dlg.removeEventListener('close', onClose);
			if (dlg.returnValue === 'ok') { //returnValueにvalue属性の値が入る
				const inputValue = document.querySelector('#input').value;//入力値を取得
				alert(inputValue);//テストのためalert
				resolve(inputValue);//入力値をresolve
			} else {
				reject();
			}
		}
		dlg.addEventListener('close', onClose, {once: true});
	});
}


/**
 * 下記リンクのソースコードそのまま貼っています
 * http://sourcechord.hatenablog.com/entry/2015/11/05/010404
 */
const {remote} = require('electron');
const {dialog} = remote;
function showOpenDialog() {
	'use strict';
	const win = remote.getCurrentWindow();
	const options = {
		title: 'タイトル',
		filters: [
            {name: 'JPEG File', extensions: ['jpg', 'jpeg']},
            {name: 'All Files', extensions: ['*']}
		],
		properties: ['openFile', 'createDirectory']
	};
    
	dialog.showOpenDialog(win, options);
}

function showSaveDialog() {
	'use strict';
	const win = remote.getCurrentWindow();
	const options = {
		title: 'タイトル',
		filters: [
            {name: 'JPEG File', extensions: ['jpg', 'jpeg']},
            {name: 'All Files', extensions: ['*']}
		]
	};
    
	dialog.showSaveDialog(win, options);
}

function showMessageBox() {
	'use strict';
	const win = remote.getCurrentWindow();
	const options = {
		type: 'info',
		buttons: ['OK', 'テスト', 'Cancel', 'sample', 'Yes', 'No'],
		title: 'タイトル',
		message: 'メッセージ',
		detail: '詳細メッセージ'
	};
    
	dialog.showMessageBox(win, options);
}

function showErrorBox() {
	'use strict';
	dialog.showErrorBox('タイトル', '本文');
}