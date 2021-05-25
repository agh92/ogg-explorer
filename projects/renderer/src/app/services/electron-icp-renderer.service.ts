import { Inject, Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from "electron";
import { Observable } from 'rxjs';
import { ICP_RENDERER_TOKEN } from '../factories/ipc-renderer.factory';

@Injectable({
  providedIn: 'root'
})
export class ElectronIcpRendererService {

  constructor(@Inject(ICP_RENDERER_TOKEN) private ipcRenderer: IpcRenderer) { }

  public on$<T>(channel: string): Observable<T> {
    const channel$ = new Observable<T>(subscriber => {
      this.ipcRenderer.on(channel, (event: IpcRendererEvent, args?: T) => {
        subscriber.next(args);
      });
    });

    return channel$;
  }

  public async invoke<T>(channel: string): Promise<T> {
    return this.ipcRenderer.invoke(channel);
  }
}
