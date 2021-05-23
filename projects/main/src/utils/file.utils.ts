import { Readable, Writable } from "stream";
import fs from 'fs';

const ogg = require('ogg');
const sound = require("sound-play");

export function countOggPackets(file: string): Promise<number> {
    const decoder: Writable = new ogg.Decoder();
    const readStream: Readable = fs.createReadStream(file);

    let numberOfPackets = 0;

    decoder.on('stream', (stream: Readable) => {
        stream.on('data', () => numberOfPackets++);
    });

    return new Promise(resolve => {
        decoder.on('finish', () => {
            console.log(`finish ${file}`);
            readStream.unpipe(decoder);
            decoder.end();
            resolve(numberOfPackets);
        });

        // pipe the ogg file to the Decoder
        readStream.pipe(decoder);
    });
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
    if (parts === 0) {
        return path;
    }
    const temp = path.substring(0, path.lastIndexOf("/"));
    return removePartsOfPath(temp, --parts);
}