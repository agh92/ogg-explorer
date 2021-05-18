import { InterProcessCommunicationService } from "./interprocess-comunnication.service";

const fs = require('fs');
const path = require('path');

const SUPPORTED_FORMATS = ['ogg', 'aac']

export class VoiceNoteService {
    constructor(private ipcService: InterProcessCommunicationService) {
        this.setUpCommunicationEvents();
    }

    private setUpCommunicationEvents() {
        this.ipcService.on('voice-notes', (event) => {
            const location = '/Users/andresgilherrera/Downloads';
            const files: string[] = fs.readdirSync(location);
            event.returnValue = files
                .filter(file => this.isFormatSupported(file))
                .map(file => ({ location: path.join(location, file), type: this.typeForFile(file), name: file }));
        });
    }

    private isFormatSupported(file: string) {
        return SUPPORTED_FORMATS.some(format => file.endsWith(format));
    }

    private typeForFile(fileName: string) {
        return fileName.endsWith('ogg') ? 'audio/ogg' : 'audio/aac';
    }
}