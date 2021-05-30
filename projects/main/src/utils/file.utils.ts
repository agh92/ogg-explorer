import fs from 'fs';

const sound = require("sound-play");

export function getSizeInBytes(file: string): number {
    const stats = fs.statSync(file)
    return stats.size;
}

export async function playAudioFile(file: string) {
    try {
        await sound.play(file);
    } catch (error) {
        console.error(`error playing ${file}`);
        throw new Error(error);
    }
}

export function readContentsOfDir(dir: string, filter?: (file: string) => boolean) {
    const files: string[] = fs.readdirSync(dir);
    return files.filter(file => filter ? filter(file) : true);
}

export function removePartsOfPath(path: string, parts: number): string {
    const startOfLastPart = path.lastIndexOf("/");
    if (parts <= 0 || startOfLastPart <= 0) {
        return path;
    }
    const temp = path.substring(0, startOfLastPart);
    return removePartsOfPath(temp, --parts);
}