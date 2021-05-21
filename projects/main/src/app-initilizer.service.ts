import { PathLike } from "fs";
import { AppMenuService } from "./app-menu.service";
import { InterProcessCommunicationService } from "./interprocess-comunnication.service";
import { VoiceNoteService } from "./voice-notes.services";
import { WindowInitializerService } from "./window-initializer.service";


export class AppInitilizerService {
    initApp(indexLocation: PathLike) {
        const windowInitialzer = new WindowInitializerService(indexLocation);
        windowInitialzer.initWindow();

        const menuService = new AppMenuService();

        const communicationService = new InterProcessCommunicationService(windowInitialzer.appWindow.webContents);
        const voiceNoteService = new VoiceNoteService(communicationService);

        menuService.addMenuItems(...voiceNoteService.menuItems);
        menuService.initMenu();
    }
}