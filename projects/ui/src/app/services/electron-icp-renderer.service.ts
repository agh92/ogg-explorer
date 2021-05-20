import { Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from "electron";

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

  public on<T>(channel: string, callback: (event: IpcRendererEvent, args?: T) => void) {
    this.ipc.on(channel, callback);
  }

  public send(event: string, args?: any[]) {
    this.ipc.send(event, args);
  }

  public sendSync<T>(event: string, args?: any[]) {
    return this.ipc.sendSync(event, args) as T;
  }
}
