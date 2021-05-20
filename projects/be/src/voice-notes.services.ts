import { Readable, Writable } from "stream";
import { InterProcessCommunicationService } from "./interprocess-comunnication.service";

const fs = require('fs');
const path = require('path');
const ogg = require('ogg');

const SUPPORTED_FORMATS = ['ogg', 'aac'];

let fileLimit = 0;

export class VoiceNoteService {
    constructor(private ipcService: InterProcessCommunicationService) {
        this.setUpCommunicationEvents();
    }

    private setUpCommunicationEvents() {
        this.ipcService.on('voice-notes', async (event) => {
            const container = '/Users/andresgilherrera/Downloads';
            const files: string[] = fs.readdirSync(container);
            const returnValue = files
                .filter(file => this.isFormatSupported(file))
                .map(async file => {
                    const location = path.join(container, file);
                    const type = this.typeForFile(file);
                    return {
                        location,
                        type,
                        name: file,
                        length: type === 'audio/ogg' ? await this.countOggPackets(location) : 0
                    }
                });
            const reply = await Promise.all(returnValue);
            event.reply('voice-notes', reply);
        });
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