import { Component, OnInit } from '@angular/core';
import { VoiceNote, VoiceNotesService } from '../../services/voice-notes.service';

enum SortBy {
  NONE,
  LENGTH_ASCENDING,
  LENGTH_DECENDING
}

@Component({
  selector: 'app-voice-notes',
  templateUrl: './voice-notes.component.html',
  styleUrls: ['./voice-notes.component.scss']
})
export class VoiceNotesComponent implements OnInit {

  public files!: VoiceNote[];

  private currentSorting: SortBy = SortBy.NONE;

  private unsortedFiles!: VoiceNote[];
  private sortedByLegnthAscending!: VoiceNote[];
  private sortedByLegnthDescending!: VoiceNote[];

  constructor(private voiceNotesService: VoiceNotesService) { }

  ngOnInit(): void {
    this.unsortedFiles = this.voiceNotesService.voiceNotes;
    this.files = this.voiceNotesService.voiceNotes;
    console.log(`Number of voice notes ${this.unsortedFiles.length}`);
  }

  public sortVoiceNotes() {
    switch (this.currentSorting) {
      case SortBy.NONE:
        
        break;
      case SortBy.LENGTH_ASCENDING:

        break;
      case SortBy.LENGTH_DECENDING:

        break;
    }
  }

}
