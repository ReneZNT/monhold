const { ipcMain } = require('electron');

ipcMain.on('Teste', (event, arg) => {
    console.log(arg);
})