import { TestBed } from '@angular/core/testing';
import { IpcRenderer, IpcRendererEvent } from 'electron';
import { ICP_RENDERER_TOKEN } from '../factories/ipc-renderer.factory';
import { ElectronIcpRendererService } from './electron-icp-renderer.service';


describe('ElectronIcpRendererService', () => {
    let service: ElectronIcpRendererService;
    let ipcRender: IpcRenderer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ICP_RENDERER_TOKEN, useValue: {
                        invoke: () => Promise.resolve(),
                        on: () => { }
                    }
                }
            ]
        });
        service = TestBed.inject(ElectronIcpRendererService);
        ipcRender = TestBed.get(ICP_RENDERER_TOKEN);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('on$', () => {
        it('should forward to electon ipcRenderer.on when subscribed', () => {
            const testChannel = 'testChannel';
            const spy = spyOn<IpcRenderer>(ipcRender, 'on');
            const dummy$ = service.on$(testChannel);
            expect(spy).not.toHaveBeenCalled();
            dummy$.subscribe();
            expect(spy).toHaveBeenCalledWith(testChannel, jasmine.any(Function));
        });

        it('should emit when channel receives event', (done) => {
            const testChannel = 'testChannel';
            const dummyChannelEvent = {};
            spyOn<IpcRenderer>(ipcRender, 'on').and.callFake(
                (channel: string, callBack: (event: IpcRendererEvent, args?: any) => void) => {
                    callBack({} as any, dummyChannelEvent);
                });
            service.on$(testChannel).subscribe((channelEvent) => {
                expect(channelEvent).toBe(dummyChannelEvent);
                done();
            });
        });
    });


    it('should foward invoke to electon ipcRenderer.invoke', () => {
        const testChannel = 'testChannel';
        const spy = spyOn<IpcRenderer>(ipcRender, 'invoke');
        service.invoke(testChannel);
        expect(spy).toHaveBeenCalledWith(testChannel);
    });

});
