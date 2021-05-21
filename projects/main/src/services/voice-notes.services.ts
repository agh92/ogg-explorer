import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import { playAudioFile } from "../utils/file.utils";
import { VoiceNote } from "interfaces";
import { MenuItemProvider } from "./app-menu.service";
import { VoiceNotesProvider } from "../providers/voice-notes.provider";
import { SortBy, sortVoiceNotes } from "../utils/voice-notes.utils";
import { dialog } from "electron";

export class VoiceNoteService implements MenuItemProvider {

    private voiceNotesProvider = new VoiceNotesProvider();
    private _voiceNotesLocation!: string;

    private cachedNotes: VoiceNote[] = [];
    private unsortedVoiceNotes: VoiceNote[] = [];
    private nextSorting = SortBy.LENGTH_ASCENDING;

    constructor(private ipcService: InterProcessCommunicationService) {
        this.setUpHandles();
    }

    public get menuItems(): Electron.MenuItemConstructorOptions[] {
        return [
            {
                label: 'Load',
                click: () => this.loadVoiceNotes()
            },
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

    private get voiceNotesLocation(): string {
        if (!this._voiceNotesLocation) {
            throw new Error("Select location first");
        }
        return this._voiceNotesLocation;
    }

    private setUpHandles() {
        this.ipcService.handle('voice-notes', async () => {
            await this.getVoiceNotes();
            return this.cachedNotes;
        });
    }

    private async loadVoiceNotes() {
        const selectedDir = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
        if (selectedDir && selectedDir.length === 1) {
            this._voiceNotesLocation = selectedDir[0];
            await this.getVoiceNotes();
            this.ipcService.send('voice-notes', this.cachedNotes);
        }
    }

    private async getVoiceNotes() {
        this.cachedNotes = await this.voiceNotesProvider.getVoiceNotes(this.voiceNotesLocation);
        this.unsortedVoiceNotes = this.cachedNotes;
    }

    private toggleSort() {
        const { voiceNotes, nextSorting } = sortVoiceNotes(this.unsortedVoiceNotes, this.nextSorting);
        this.nextSorting = nextSorting;
        this.cachedNotes = voiceNotes;
        this.ipcService.send('voice-notes', this.cachedNotes);
    }

    private async playRandomVoiceNotes() {
        if (!this.cachedNotes) {
            this.cachedNotes = await this.voiceNotesProvider.getVoiceNotes(this.voiceNotesLocation);
        }
        const voiceNoteLocation = this.getRandomVoiceNote().location;
        this.tryToPlayVoiceNote(voiceNoteLocation);
    }

    private async tryToPlayVoiceNote(voiceNoteLocation: string) {
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