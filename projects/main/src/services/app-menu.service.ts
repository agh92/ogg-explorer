import { App, shell, Menu } from "electron";
import defaultMenu from 'electron-default-menu';

export interface MenuItemProvider {
    menuItems: Electron.MenuItemConstructorOptions[]
}

export class AppMenuService {

    private items: Electron.MenuItemConstructorOptions[] = [];

    private appDefaultMenu: Electron.MenuItemConstructorOptions[];

    constructor(app: App) {
        this.appDefaultMenu = defaultMenu(app, shell);
    }

    public initMenu() {
        // replace default edit
        this.appDefaultMenu[1] = {
            label: 'Edit',
            submenu: this.items
        };
        this.setHelpUrl();
        Menu.setApplicationMenu(Menu.buildFromTemplate(this.appDefaultMenu));
    }

    private setHelpUrl() {
        const helpMenu = this.appDefaultMenu.find(menu => menu.role === 'help');
        (helpMenu?.submenu as Electron.MenuItemConstructorOptions[])[0].click = () => shell.openExternal('https://github.com/agh92/ogg-explorer');
    }

    public addEditMenuItems(...items: Electron.MenuItemConstructorOptions[]) {
        this.items.push(...items);
    }
}