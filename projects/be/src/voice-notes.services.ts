import { Readable, Writable } from "stream";
import { InterProcessCommunicationService } from "./interprocess-comunnication.service";

const fs = require('fs');
const path = require('path');
const ogg = require('ogg');
const sound = require("sound-play");

export interface VoiceNote {
    name: string,
    location: string,
    type: string,
    length?: number
}

const SUPPORTED_FORMATS = ['ogg', 'aac'];
const VOICE_NOTES_LOCATION = '/Users/andresgilherrera/Downloads';

export class VoiceNoteService {

    private cachedNotes: VoiceNote[] = [];

    constructor(private ipcService: InterProcessCommunicationService) {
        this.setUpCommunicationEvents();
    }

    private setUpCommunicationEvents() {
        this.ipcService.handle('voice-notes', async (event) => {
            this.cachedNotes = await this.readVoiceNotes();
            return this.cachedNotes;
        });

        this.ipcService.handle('voice-notes-play-random', async (event) => {
            return this.playRandomVoiceNotes();
        });
    }

    private async playRandomVoiceNotes() {
        if (!this.cachedNotes) {
            this.cachedNotes = await this.readVoiceNotes();
        }

        const randomIndex = Math.floor(Math.random() * this.cachedNotes.length);
        const voiceNoteLocation = this.cachedNotes[randomIndex].location;

        try {
            await sound.play(voiceNoteLocation);
            return voiceNoteLocation;
        } catch (error) {
            console.error(`error playing ${voiceNoteLocation}`);
            throw new Error(error);
        }
    }

    private readVoiceNotes(): Promise<VoiceNote[]> {
        const files: string[] = fs.readdirSync(VOICE_NOTES_LOCATION);
        const returnValue = files
            .filter(file => this.isFormatSupported(file))
            .map(async file => {
                const location = path.join(VOICE_NOTES_LOCATION, file);
                const type = this.typeForFile(file);
                return {
                    location,
                    type,
                    name: file,
                    length: type === 'audio/ogg' ? await this.countOggPackets(location) : 0
                }
            });
        return Promise.all(returnValue);
    }

    private isFormatSupported(file: string) {
        return SUPPORTED_FORMATS.some(format => file.endsWith(format));
    }

    private typeForFile(fileName: string) {
        return fileName.endsWith('ogg') ? 'audio/ogg' : 'audio/aac';
    }

    private countOggPackets(file: string): Promise<number> {
        const decoder: Writable = new ogg.Decoder();
        const readStream: Readable = fs.createReadStream(file);

        let numberOfPackets = 0;

        decoder.on('stream', (stream: Readable) => {
            stream.on('data', () => numberOfPackets++);
        });

        return new Promise(resolve => {
            decoder.on('finish', () => {
                console.log(`finish ${file}`);
                readStream.unpipe(decoder);
                decoder.end();
                resolve(numberOfPackets);
            });

            // pipe the ogg file to the Decoder
            readStream.pipe(decoder);
        });
    }
}