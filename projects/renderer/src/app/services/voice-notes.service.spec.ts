import { TestBed } from '@angular/core/testing';

import { VoiceNotesService } from './voice-notes.service';

describe('VoiceNotesService', () => {
  let service: VoiceNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
