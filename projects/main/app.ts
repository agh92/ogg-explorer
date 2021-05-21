import { AppInitilizerService } from "./src/app-initilizer.service";

const { app, } = require('electron');
const path = require("path");

function initApp() {
  const appInitilizerService = new AppInitilizerService();
  appInitilizerService.initApp(path.join(__dirname, `index.html`));
}

app.on('ready', initApp);

// Close when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window === null) {
    initApp();
  }
})
