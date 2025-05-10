const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const indexPath = path.join(__dirname, 'index.html');

    console.log("Looking for index.html at:", indexPath);
    if (!fs.existsSync(indexPath)) {
        console.error("❌ ERROR: index.html not found.");
        return;
    }

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: false
        }
    });

    win.loadFile(indexPath).catch(err => {
        console.error("Failed to load index.html:", err);
    });

    win.webContents.openDevTools(); // Optional
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
