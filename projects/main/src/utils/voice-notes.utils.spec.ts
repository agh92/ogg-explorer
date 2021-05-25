import { expect } from 'chai';
import 'mocha';
import { VoiceNote } from 'interfaces';
import { SortBy, sortVoiceNotes } from './voice-notes.utils';

describe('VoiceNotesUtils', () => {
    describe('sortVoiceNotes', () => {

        let dummyNotes: VoiceNote[];

        beforeEach(() => {
            dummyNotes = [
                {
                    name: 'string',
                    location: 'string',
                    type: 'audio/ogg',
                    length: 3
                },
                {
                    name: 'string',
                    location: 'string',
                    type: 'audio/ogg',
                    length: 1
                },
                {
                    name: 'string',
                    location: 'string',
                    type: 'audio/ogg',
                    length: 4
                }
            ];
        });

        it('should return same order if SortBy.NONE given', () => {
            const expectedOrder = [3, 1, 4];
            const { voiceNotes } = sortVoiceNotes(dummyNotes, SortBy.NONE);
            voiceNotes.forEach((VoiceNote, index) => {
                expect(VoiceNote.length).to.equal(expectedOrder[index]);
            });
        });

        it('should return acending order if SortBy.LENGTH_ASCENDING given', () => {
            const expectedOrder = [1, 3, 4];
            const { voiceNotes } = sortVoiceNotes(dummyNotes, SortBy.LENGTH_ASCENDING);
            voiceNotes.forEach((VoiceNote, index) => {
                expect(VoiceNote.length).to.equal(expectedOrder[index]);
            });
        });

        it('should return descending order if SortBy.LENGTH_DECENDING given', () => {
            const expectedOrder = [4, 3, 1];
            const { voiceNotes } = sortVoiceNotes(dummyNotes, SortBy.LENGTH_DECENDING);
            voiceNotes.forEach((VoiceNote, index) => {
                expect(VoiceNote.length).to.equal(expectedOrder[index]);
            });
        });

        it('should loop through the values of SortBy', (done) => {
            const startSorting = SortBy.NONE;
            let next = SortBy.NONE;

            do {
                const { nextSorting } = sortVoiceNotes(dummyNotes, next);
                next = nextSorting;
            } while (next !== startSorting);

            done();
        });
    });
});