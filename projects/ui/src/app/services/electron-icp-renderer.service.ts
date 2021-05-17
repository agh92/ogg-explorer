import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";

@Injectable({
  providedIn: 'root'
})
export class ElectronIcpRendererService {

  private ipc!: IpcRenderer;

  constructor() { 
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public send(event: string, callback: () => void) {
    this.ipc.send(event, callback);
  }

  public sendSync(event: string) {
    return this.ipc.sendSync(event);
  }
}
