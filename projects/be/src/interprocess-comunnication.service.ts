import { ipcMain } from 'electron';
const fs = require('fs');

export class InterProcessCommunicationService {
    constructor() { }

    public setUpCommunicationEvents() {
        ipcMain.on('voice-notes', (event, arg) => {
            event.returnValue = fs.readdirSync("/Users/andresgilherrera/Downloads");
        })
    }

}