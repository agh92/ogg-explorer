import { PathLike } from "fs";
import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import { VoiceNoteService } from "./voice-notes.services";
import { WindowInitializerService } from "./window-initializer.service";


export class AppInitilizerService {
    initApp(indexLocation: PathLike) {
        const windowInitialzer = new WindowInitializerService(indexLocation);
        windowInitialzer.initWindow();

        const communicationService = new InterProcessCommunicationService();

        const voiceNoteService = new VoiceNoteService(communicationService);
    }
}