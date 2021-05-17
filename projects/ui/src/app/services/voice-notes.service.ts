import { Injectable } from '@angular/core';
import { ElectronIcpRendererService } from './electron-icp-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class VoiceNotesService {

  constructor(private icpService: ElectronIcpRendererService) { }

  get voiceNotes(): string[] {
    return this.icpService.sendSync('voice-notes');
  }
  
}
