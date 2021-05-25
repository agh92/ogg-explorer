import { Injectable } from '@angular/core';
import { VoiceNote } from 'interfaces';
import { Observable } from 'rxjs';
import { ElectronIcpRendererService } from './electron-icp-renderer.service';


@Injectable({
  providedIn: 'root'
})
export class VoiceNotesService {

  constructor(private icpService: ElectronIcpRendererService) {
  }

  get voiceNotes$(): Observable<VoiceNote[]> {
    return this.icpService.on$<VoiceNote[]>('voice-notes');
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
