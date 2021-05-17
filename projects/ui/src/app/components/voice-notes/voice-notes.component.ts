import { Component, OnInit } from '@angular/core';
import { VoiceNotesService } from '../../services/voice-notes.service';

@Component({
  selector: 'app-voice-notes',
  templateUrl: './voice-notes.component.html',
  styleUrls: ['./voice-notes.component.scss']
})
export class VoiceNotesComponent implements OnInit {

  public files!: string[];

  constructor(private voiceNotesService: VoiceNotesService) { }

  ngOnInit(): void {
    this.files = this.voiceNotesService.voiceNotes;
  }

}
