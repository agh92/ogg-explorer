import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import * as fileUtils from "./file.utils";
import { VoiceNote } from "interfaces";
import { MenuItemProvider } from "./app-menu.service";

const path = require('path');


const SUPPORTED_FORMATS = ['ogg', 'aac'];
const VOICE_NOTES_LOCATION = '/Users/andresgilherrera/Downloads';

enum SortBy {
    NONE = 'none',
    LENGTH_ASCENDING = 'acending',
    LENGTH_DECENDING = 'descending'
}

export class VoiceNoteService implements MenuItemProvider {

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

    private toggleSort() {
        const currentSorting = this.nextSorting;
        this.nextSorting = this.getNexSorting(currentSorting);
        if (currentSorting === SortBy.NONE) {
            this.cachedNotes = this.unsortedVoiceNotes;
        } else {
            const sortingFunction = this.getSortingFunction(currentSorting);
            this.cachedNotes = [...this.unsortedVoiceNotes].sort(sortingFunction);
        }
        this.ipcService.send('voice-notes', this.cachedNotes);
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

    private setUpHandles() {
        this.ipcService.handle('voice-notes', async () => {
            this.cachedNotes = await this.readVoiceNotes();
            this.unsortedVoiceNotes = this.cachedNotes;
            return this.cachedNotes;
        });
    }

    private async playRandomVoiceNotes() {
        if (!this.cachedNotes) {
            this.cachedNotes = await this.readVoiceNotes();
        }

        const voiceNoteLocation = this.getRandomVoiceNote().location;
        
        try {
            await fileUtils.playAudioFile(voiceNoteLocation);
        } catch (error) {
            console.log(error)
        }
    }

    private getRandomVoiceNote(): VoiceNote {
        const randomIndex = Math.floor(Math.random() * this.cachedNotes.length);
        return this.cachedNotes[randomIndex];
    }

    private readVoiceNotes(): Promise<VoiceNote[]> {
        const returnValue = fileUtils
            .readContentsOfDir(VOICE_NOTES_LOCATION, this.isFormatSupported)
            .map(async file => {
                const location = path.join(VOICE_NOTES_LOCATION, file);
                const type = this.typeForFile(file);
                return {
                    location,
                    type,
                    name: file,
                    length: type === 'audio/ogg' ? await fileUtils.countOggPackets(location) : 0
                }
            });
        return Promise.all(returnValue);
    }

    private typeForFile(fileName: string) {
        return fileName.endsWith('ogg') ? 'audio/ogg' : 'audio/aac';
    }

    private isFormatSupported(file: string) {
        return SUPPORTED_FORMATS.some(format => file.endsWith(format));
    }
}