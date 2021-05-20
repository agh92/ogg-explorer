import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class VoiceNotesComponent implements OnInit, OnDestroy {

  public voiceNotes!: VoiceNote[];
  private unsortedFiles?: VoiceNote[];
  private sortedByLegnthAscending!: VoiceNote[];
  private sortedByLegnthDescending!: VoiceNote[];

  private currentSorting: SortBy = SortBy.NONE;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private voiceNotesService: VoiceNotesService,
    private readonly changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.voiceNotesService.voiceNotes$.pipe(takeUntil(this.unsubscribe$)).subscribe((notes) => {
      this.voiceNotes = notes;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
