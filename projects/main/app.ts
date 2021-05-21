import { AppInitilizerService } from "./src/services/app-initilizer.service";

const { app, } = require('electron');
const path = require("path");

console.log(process.cwd());

function initApp() {
  const appInitilizerService = new AppInitilizerService();
  // appInitilizerService.initApp(path.join(process.cwd(), 'dist', 'index.html'));
  // TODO check this + copy node moudles to dist + package.json in dist has to have the modules imported in the main
  appInitilizerService.initApp('/Users/andresgilherrera/Dev/memorial/dist/memorial-darwin-x64/memorial.app/Contents/Resources/app/index.html');
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
