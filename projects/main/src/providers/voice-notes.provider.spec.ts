import { ImportMock } from 'ts-mock-imports';
import { expect } from 'chai';
import 'mocha';
import { VoiceNotesProvider } from './voice-notes.provider';

import * as fileUtils from "../utils/file.utils";
import { SinonStub } from 'sinon';
import path from 'path';



describe('VoiceNotesProvider', () => {

    let voiceNotesProvider: VoiceNotesProvider;
    let mockReadContetnsOfDir: SinonStub;
    let mockGetSizeInBytes: SinonStub;
    let mockFiles: string[];

    beforeEach(() => {
        voiceNotesProvider = new VoiceNotesProvider();
        mockReadContetnsOfDir = ImportMock.mockFunction(fileUtils, 'readContentsOfDir');
        mockGetSizeInBytes = ImportMock.mockFunction(fileUtils, 'getSizeInBytes');
        mockGetSizeInBytes.returns(0);
    });

    afterEach(() => {
        mockFiles = [];
        mockReadContetnsOfDir.restore();
        mockGetSizeInBytes.restore();
    });

    describe('getVoiceNotes', () => {

        it('should return same number of files', async () => {
            mockFiles = ['file.ogg'];
            mockReadContetnsOfDir.returns(mockFiles);
            const voiceNotesObjects = await voiceNotesProvider.getVoiceNotes('.');
            expect(voiceNotesObjects.length).to.equal(mockFiles.length);
        });

        it('should return VoiceNotes.name as files names', async () => {
            mockFiles = ['file.ogg', 'secondFile.ogg'];
            mockReadContetnsOfDir.returns(mockFiles);
            const voiceNotesObjects = await voiceNotesProvider.getVoiceNotes('.');
            voiceNotesObjects.forEach((voiceNote, index) => {
                expect(voiceNote.name).to.equal(mockFiles[index]);
            });
        });

        it('should return VoiceNotes.location as given path and file name', async () => {
            mockFiles = ['file.ogg', 'secondFile.ogg'];
            mockReadContetnsOfDir.returns(mockFiles);
            const mockRoot = '.';
            const voiceNotesObjects = await voiceNotesProvider.getVoiceNotes(mockRoot);
            voiceNotesObjects.forEach((voiceNote, index) => {
                expect(voiceNote.location).to.equal(path.join(mockRoot, mockFiles[index]));
            });
        });
    });
});