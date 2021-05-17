import { ipcMain } from 'electron';
const fs = require('fs');
const path = require('path');

export class InterProcessCommunicationService {
    constructor() { }

    public setUpCommunicationEvents() {
        ipcMain.on('voice-notes', (event) => {
            const location = '/Users/andresgilherrera/Downloads';
            const files: string[] = fs.readdirSync(location);
            event.returnValue = files.filter(file => file.endsWith('ogg') || file.endsWith('aac')).map(file => path.join(location, file));
        });
    }

}