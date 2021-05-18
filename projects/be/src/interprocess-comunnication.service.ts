import { ipcMain } from 'electron';


export class InterProcessCommunicationService {

    public on(channel: string, callback: (event: Electron.IpcMainEvent, ...args: any[]) => void): void {
        ipcMain.on(channel, callback);
    }
}