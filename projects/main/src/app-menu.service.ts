const { app, Menu } = require('electron')

export interface MenuItemProvider {
    menuItems: Electron.MenuItemConstructorOptions[]
}

export class AppMenuService {

    private items: Electron.MenuItemConstructorOptions[] = [];
    private menuTemplate = [
        {
            label: 'Voice Notes',
            submenu: this.items
        }
    ];

    constructor() { }

    public initMenu() {
        const menu = Menu.buildFromTemplate(this.menuTemplate);
        Menu.setApplicationMenu(menu);
    }

    public addMenuItems(...items: Electron.MenuItemConstructorOptions[]) {
        this.items.push(...items);
    }
}