import { Injectable } from '@angular/core';
import { VoiceNote } from 'interfaces';
import { Observable, ReplaySubject } from 'rxjs';
import { ElectronIcpRendererService } from './electron-icp-renderer.service';


@Injectable({
  providedIn: 'root'
})
export class VoiceNotesService {

  private _voiceNotes$ = new ReplaySubject<VoiceNote[]>(1);

  constructor(private icpService: ElectronIcpRendererService) {

    icpService.on<VoiceNote[]>('voice-notes', (evet, voiceNotes) => {
      this._voiceNotes$.next(voiceNotes);
    });

    this.icpService.invoke<VoiceNote[]>('voice-notes').then(notes => this._voiceNotes$.next(notes));
  }

  get voiceNotes$(): Observable<VoiceNote[]> {
    return this._voiceNotes$.asObservable();
  }

  public async playRandomVoiceNote() {
    try {
      const file = await this.icpService.invoke<string>('voice-notes-play-random');
      console.log(`played ${file}`);
    } catch (error) {
      console.error(error);
    }
  }
}
