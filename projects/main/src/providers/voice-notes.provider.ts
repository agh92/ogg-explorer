import { VoiceNote } from "interfaces";
import * as fileUtils from "../utils/file.utils";

const path = require('path');

const VOICE_NOTES_LOCATION = '/Users/andresgilherrera/Downloads';
const SUPPORTED_FORMATS = ['ogg', 'aac'];

export class VoiceNotesProvider {

    public getVoiceNotes(): Promise<VoiceNote[]> {
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