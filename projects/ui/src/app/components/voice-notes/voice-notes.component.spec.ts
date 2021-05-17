import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceNotesComponent } from './voice-notes.component';

describe('VoiceNotesComponent', () => {
  let component: VoiceNotesComponent;
  let fixture: ComponentFixture<VoiceNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
