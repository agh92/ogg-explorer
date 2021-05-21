import { ipcMain, WebContents } from 'electron';


export class InterProcessCommunicationService {

    constructor(private webContents: WebContents) {}

    public handle(channel: string, callback: (event: any, ...args: any[]) => void) {
        ipcMain.handle(channel, callback);
    }

    public send<T>(channel: string, args: T) {
        this.webContents.send(channel, args);
    }
}