import { InterProcessCommunicationService } from "./src/interprocess-comunnication.service";
import { WindowInitializerService } from "./src/window-initializer.service";

const { app, } = require('electron');
const path = require("path");

function initApp() {
  const windowInitialzer = new WindowInitializerService(path.join(__dirname, `index.html`));
  windowInitialzer.initWindow();
  
  const communicationService = new InterProcessCommunicationService();
  communicationService.setUpCommunicationEvents();
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
