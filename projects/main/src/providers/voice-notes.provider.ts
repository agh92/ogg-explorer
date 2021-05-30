import { VoiceNote } from "interfaces";
import * as fileUtils from "../utils/file.utils";
import path from 'path';

const SUPPORTED_FORMATS = ['ogg'];

export class VoiceNotesProvider {

    public getVoiceNotes(voiceNotesLocation: string): Promise<VoiceNote[]> {
        const returnValue = fileUtils
            .readContentsOfDir(voiceNotesLocation, this.isFormatSupported)
            .map(async file => {
                const location = path.join(voiceNotesLocation, file);
                return {
                    location,
                    type: 'audio/ogg',
                    name: file,
                    length: fileUtils.getSizeInBytes(location)
                } as VoiceNote
            });
        return Promise.all(returnValue);
    }

    private isFormatSupported(file: string) {
        return SUPPORTED_FORMATS.some(format => file.endsWith(format));
    }
}