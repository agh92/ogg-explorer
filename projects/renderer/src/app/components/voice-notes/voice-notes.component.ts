import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VoiceNote, VoiceNotesService } from '../../services/voice-notes.service';

enum SortBy {
  NONE = 'none',
  LENGTH_ASCENDING = 'acending',
  LENGTH_DECENDING = 'descending'
}

@Component({
  selector: 'app-voice-notes',
  templateUrl: './voice-notes.component.html',
  styleUrls: ['./voice-notes.component.scss']
})
export class VoiceNotesComponent implements OnInit, OnDestroy {

  public voiceNotes!: VoiceNote[];
  private unsortedVoiceNotes!: VoiceNote[];

  private nextSorting: SortBy = SortBy.LENGTH_ASCENDING;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private voiceNotesService: VoiceNotesService,
    private readonly changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.voiceNotesService.voiceNotes$.pipe(takeUntil(this.unsubscribe$)).subscribe((notes) => {
      this.voiceNotes = notes;
      this.unsortedVoiceNotes = notes;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public playRandom() {
    this.voiceNotesService.playRandomVoiceNote();
  }

  public sortVoiceNotes() {
    const currentSorting = this.nextSorting;
    this.nextSorting = this.getNexSorting(currentSorting);
    if (currentSorting === SortBy.NONE) {
      this.voiceNotes = this.unsortedVoiceNotes;
    } else {
      const sortingFunction = this.getSortingFunction(currentSorting);
      this.voiceNotes = [...this.unsortedVoiceNotes].sort(sortingFunction);
    }
    this.changeDetector.detectChanges();
  }

  private getSortingFunction(currentSorting: SortBy): (a: VoiceNote, b: VoiceNote) => number {
    switch (currentSorting) {
      case SortBy.LENGTH_DECENDING:
        return (a, b) => ((b.length ? b.length : 0) - (a.length ? a.length : 0));
      case SortBy.LENGTH_ASCENDING:
        return (a, b) => ((a.length ? a.length : 0) - (b.length ? b.length : 0));
      default:
        throw new Error("Unsupported sorting");
    }
  }

  private getNexSorting(currentSorting: SortBy) {
    switch (currentSorting) {
      case SortBy.NONE:
        return SortBy.LENGTH_ASCENDING;
      case SortBy.LENGTH_ASCENDING:
        return SortBy.LENGTH_DECENDING;
      case SortBy.LENGTH_DECENDING:
        return SortBy.NONE;
      default:
        throw new Error("Unsupported sorting");
    }
  }
}
