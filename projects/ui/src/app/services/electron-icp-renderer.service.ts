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

  public async invoke<T>(channel: string): Promise<T> {
    return this.ipc.invoke(channel);
  }
}
