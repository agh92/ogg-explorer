import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceNotesComponent } from './components/voice-notes/voice-notes.component';
import { VoiceNoteComponent } from './components/voice-note/voice-note.component';

@NgModule({
  declarations: [
    AppComponent,
    VoiceNotesComponent,
    VoiceNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }