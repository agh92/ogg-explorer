import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
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

  constructor(private icpService: ElectronIcpRendererService) { }

  get voiceNotes$(): Observable<VoiceNote[]> {
    return from(this.icpService.invoke<VoiceNote[]>('voice-notes'));
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