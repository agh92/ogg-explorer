import { AppInitilizerService } from "./src/services/app-initilizer.service";
import { removePartsOfPath } from "./src/utils/file.utils";
import { app } from 'electron';
import path from "path";

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
