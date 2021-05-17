import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoiceNotesComponent } from './components/voice-notes/voice-notes.component';

const routes: Routes = [
  { path: "", component: VoiceNotesComponent },
  { path: "/", component: VoiceNotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
