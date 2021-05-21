import { ipcMain } from 'electron';


export class InterProcessCommunicationService {

    public handle(channel: string, callback: (event: any, ...args: any[]) => void) {
        ipcMain.handle(channel, callback);
    }
}