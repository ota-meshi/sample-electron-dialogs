(function() {
	'use strict';
	const {app, BrowserWindow} = require('electron');
 
	let win;
	function createWindow() {
		win = new BrowserWindow();
		win.loadURL(`file://${__dirname}/index.html`);
		win.on('closed', () => {
			win = null;
		});
	}
	app.on('ready', () => {
		createWindow();
	});
	app.on('activate', () => {
		if (win === null) {
			createWindow();
		}
	});
	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
 
	
})();
