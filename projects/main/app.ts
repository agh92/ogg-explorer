import { AppInitilizerService } from "./src/services/app-initilizer.service";

const { app, } = require('electron');
const path = require("path");


function removePartsOfPath(path: string, parts: number): string {
  if (parts === 0) {
    return path;
  }
  const temp = path.substring(0, path.lastIndexOf("/"));
  return removePartsOfPath(temp, --parts);
}

function initApp() {
  const appInitilizerService = new AppInitilizerService();
  const indexDir = removePartsOfPath(__dirname, 2);
  appInitilizerService.initApp(app, path.join(indexDir, 'index.html'));
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
