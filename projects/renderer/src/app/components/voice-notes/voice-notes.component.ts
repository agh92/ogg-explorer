import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VoiceNotesService } from '../../services/voice-notes.service';
import { VoiceNote } from "interfaces";

@Component({
  selector: 'app-voice-notes',
  templateUrl: './voice-notes.component.html'
})
export class VoiceNotesComponent implements OnInit, OnDestroy {

  public voiceNotes!: VoiceNote[];
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
}
