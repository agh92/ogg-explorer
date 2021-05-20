import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ElectronIcpRendererService } from './electron-icp-renderer.service';

export interface VoiceNote {
  name: string,
  location: string,
  type: string,
  length?: number
}

@Injectable({
  providedIn: 'root'
})
export class VoiceNotesService {

  private _voiceNotes$: ReplaySubject<VoiceNote[]> = new ReplaySubject(1);

  constructor(private icpService: ElectronIcpRendererService) {
    this.icpService.on<VoiceNote[]>('voice-notes', (event, args) => {
      if (args) {
        this._voiceNotes$.next(args);
      }
    });
    this.icpService.send('voice-notes');
  }

  get voiceNotes$(): Observable<VoiceNote[]> {
    return this._voiceNotes$.asObservable();
  }
}
