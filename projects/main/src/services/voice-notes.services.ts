import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import { playAudioFile } from "../utils/file.utils";
import { VoiceNote } from "interfaces";
import { MenuItemProvider } from "./app-menu.service";
import { VoiceNotesProvider } from "../providers/voice-notes.provider";
import { SortBy, getNexSorting, getSortingFunction } from "../utils/voice-notes.utils";

export class VoiceNoteService implements MenuItemProvider {

    private voiceNotesProvider = new VoiceNotesProvider();
    private cachedNotes: VoiceNote[] = [];
    private unsortedVoiceNotes: VoiceNote[] = [];
    private nextSorting = SortBy.LENGTH_ASCENDING;

    constructor(private ipcService: InterProcessCommunicationService) {
        this.setUpHandles();
    }

    public get menuItems(): Electron.MenuItemConstructorOptions[] {
        return [
            {
                label: 'Toggle Sort',
                click: () => this.toggleSort()
            },
            {
                label: 'Play Random',
                click: () => this.playRandomVoiceNotes()
            }
        ];
    }

    private setUpHandles() {
        this.ipcService.handle('voice-notes', async () => {
            this.cachedNotes = await this.voiceNotesProvider.getVoiceNotes();
            this.unsortedVoiceNotes = this.cachedNotes;
            return this.cachedNotes;
        });
    }

    private toggleSort() {
        const currentSorting = this.nextSorting;
        this.nextSorting = getNexSorting(currentSorting);
        if (currentSorting === SortBy.NONE) {
            this.cachedNotes = this.unsortedVoiceNotes;
        } else {
            const sortingFunction = getSortingFunction(currentSorting);
            this.cachedNotes = [...this.unsortedVoiceNotes].sort(sortingFunction);
        }
        this.ipcService.send('voice-notes', this.cachedNotes);
    }

    private async playRandomVoiceNotes() {
        if (!this.cachedNotes) {
            this.cachedNotes = await this.voiceNotesProvider.getVoiceNotes();
        }

        const voiceNoteLocation = this.getRandomVoiceNote().location;

        try {
            await playAudioFile(voiceNoteLocation);
        } catch (error) {
            console.log(error)
        }
    }

    private getRandomVoiceNote(): VoiceNote {
        const randomIndex = Math.floor(Math.random() * this.cachedNotes.length);
        return this.cachedNotes[randomIndex];
    }
}