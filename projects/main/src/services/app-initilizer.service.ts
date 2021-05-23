import { App } from "electron";
import { AppMenuService } from "./app-menu.service";
import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import { VoiceNoteService } from "./voice-notes.services";
import { WindowInitializerService } from "./window-initializer.service";

export class AppInitilizerService {

    constructor() { }

    initApp(app: App, indexLocation: string) {
        const windowInitialzer = new WindowInitializerService(app, indexLocation);
        windowInitialzer.initWindow();
        
        const menuService = new AppMenuService(app);

        const communicationService = new InterProcessCommunicationService(windowInitialzer.webContents);
        const voiceNoteService = new VoiceNoteService(communicationService);

        menuService.addEditMenuItems(...voiceNoteService.menuItems);
        menuService.initMenu();
    }
}