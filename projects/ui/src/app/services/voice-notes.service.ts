import { Injectable } from '@angular/core';
import { ElectronIcpRendererService } from './electron-icp-renderer.service';

export interface VoiceNote {
  name: string,
  location: string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class VoiceNotesService {

  constructor(private icpService: ElectronIcpRendererService) { }

  get voiceNotes(): VoiceNote[] {
    return this.icpService.sendSync<VoiceNote[]>('voice-notes');
  }
}
