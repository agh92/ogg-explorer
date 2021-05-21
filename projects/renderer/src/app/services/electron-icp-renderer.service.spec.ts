import { TestBed } from '@angular/core/testing';

import { ElectronIcpRendererService } from './electron-icp-renderer.service';

describe('ElectronIcpRendererService', () => {
  let service: ElectronIcpRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronIcpRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
