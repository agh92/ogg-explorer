import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import * as fileUtils from "./file.utils";
import { VoiceNote } from "interfaces";

const path = require('path');


const SUPPORTED_FORMATS = ['ogg', 'aac'];
const VOICE_NOTES_LOCATION = '/Users/andresgilherrera/Downloads';

export class VoiceNoteService {

    private cachedNotes: VoiceNote[] = [];

    constructor(private ipcService: InterProcessCommunicationService) {
        this.setUpHandles();
    }

    private setUpHandles() {
        this.ipcService.handle('voice-notes', async () => {
            this.cachedNotes = await this.readVoiceNotes();
            return this.cachedNotes;
        });

        this.ipcService.handle('voice-notes-play-random', () => {
            return this.playRandomVoiceNotes();
        });
    }

    private async playRandomVoiceNotes() {
        if (!this.cachedNotes) {
            this.cachedNotes = await this.readVoiceNotes();
        }

        const voiceNoteLocation = this.getRandomVoiceNote().location;
        await fileUtils.playAudioFile(voiceNoteLocation);

        return voiceNoteLocation;
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