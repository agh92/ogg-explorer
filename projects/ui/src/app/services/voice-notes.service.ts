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
    return this.icpService.sendSync<string[]>('voice-notes').map(file => ({ location: file, type: this.typeForFile(file), name: this.nameForFile(file) }));
  }

  private typeForFile(fileName: string) {
    return fileName.endsWith('ogg') ? 'audio/ogg' : 'audio/aac';
  }

  private nameForFile(fileName: string) {
    return fileName.replace(/^.*[\\\/]/, '');
  }

}
