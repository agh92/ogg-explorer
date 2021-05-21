import { Component, Input } from '@angular/core';
import { VoiceNote } from "interfaces";

@Component({
  selector: 'app-voice-note',
  templateUrl: './voice-note.component.html',
  styleUrls: ['./voice-note.component.scss']
})
export class VoiceNoteComponent {
  @Input('voice-note') voiceNote!: VoiceNote;
}
