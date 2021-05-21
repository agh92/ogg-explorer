import { PathLike } from "fs";

import { BrowserWindow } from 'electron';
const url = require("url");

export class WindowInitializerService {

    public appWindow!: BrowserWindow;

    constructor(private indexPath: PathLike) { }

    public initWindow() {
        this.appWindow = new BrowserWindow({
            height: 800,
            width: 1500,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        // Electron Build Path
        this.appWindow.loadURL(
            url.format({
                pathname: this.indexPath,
                protocol: "file:",
                slashes: true
            })
        );

        // Initialize the DevTools.
        this.appWindow.webContents.openDevTools()

        this.appWindow.on('closed', () => {
            this.appWindow = null as any;
        });
    }
}