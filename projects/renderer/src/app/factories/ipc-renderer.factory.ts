import { IpcRenderer } from "electron";


export const ICP_RENDERER_TOKEN = 'ICPRenderer';

export function ipcRendedFactory(): IpcRenderer {
    if (window.require) {
        try {
            return window.require('electron').ipcRenderer;
        } catch (e) {
            throw e;
        }
    }

    throw new Error('Electron\'s IPC was not loaded');
}