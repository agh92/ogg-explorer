import 'mocha';

import fs from "fs";
import { ImportMock } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import { readContentsOfDir, removePartsOfPath } from './file.utils';
import path from 'path';

const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
const expect = chai.expect;

describe('FileUtils', () => {

    describe('readContentsOfDir', () => {
        let mockReaddirSync: SinonStub;
        let mockContetnsOfDir: string[];

        beforeEach(() => {
            mockReaddirSync = ImportMock.mockFunction(fs, 'readdirSync');
        });

        afterEach(() => {
            mockContetnsOfDir = [];
            mockReaddirSync.restore();
        });

        it('should return all contents if no filter given', () => {
            mockContetnsOfDir = ['foo', 'bar'];
            mockReaddirSync.returns(mockContetnsOfDir);
            const contentsOfDir = readContentsOfDir('.');
            expect(contentsOfDir.length).to.equal(mockContetnsOfDir.length);
        });

        describe('filter', () => {
            it('should be called for each element', () => {
                mockContetnsOfDir = ['foo', 'bar'];
                mockReaddirSync.returns(mockContetnsOfDir);
                const fakeFilterSpy = chai.spy();
                readContentsOfDir('.', fakeFilterSpy);
                expect(fakeFilterSpy).to.have.been.called.exactly(mockContetnsOfDir.length);
            });

            it('should be called with each element', () => {
                mockContetnsOfDir = ['foo', 'bar'];
                mockReaddirSync.returns(mockContetnsOfDir);
                const fakeFilterSpy = chai.spy();
                readContentsOfDir('.', fakeFilterSpy);
                mockContetnsOfDir.forEach(content => {
                    expect(fakeFilterSpy).to.have.been.called.with(content);
                });
            });
        });
    });

    describe('removePartsOfPath', () => {
        it('should return path as is if parts = 0', () => {
            const givenPath = path.join('foo', 'bar');
            const samePath = removePartsOfPath(givenPath, 0);
            expect(samePath).to.equal(givenPath);
        });

        it('should return path as is if parts < 0', () => {
            const givenPath = path.join('foo', 'bar');
            const samePath = removePartsOfPath(givenPath, -1);
            expect(samePath).to.equal(givenPath);
        });

        it('should return path as is if has no parts', () => {
            const givenPath = path.join('foo');
            const samePath = removePartsOfPath(givenPath, 2);
            expect(samePath).to.equal(givenPath);
        });

        it('should remove 1 part', () => {
            const givenPath = path.join('foo', 'bar');
            const expectedPath = path.join('foo');
            const shortenedPath = removePartsOfPath(givenPath, 1);
            expect(shortenedPath).to.equal(expectedPath);
        });

        it('should remove 2 part', () => {
            const givenPath = path.join('foo', 'bar', 'foo');
            const expectedPath = path.join('foo', 'bar');
            const shortenedPath = removePartsOfPath(givenPath, 1);
            expect(shortenedPath).to.equal(expectedPath);
        });
    });
});