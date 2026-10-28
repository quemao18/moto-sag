import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { EMPTY } from 'rxjs';

import { VersionCheckService } from './version-check.service';

describe('VersionCheckService', () => {
  let service: VersionCheckService;
  const swUpdate = {
    isEnabled: false,
    versionUpdates: EMPTY,
    checkForUpdate: jasmine.createSpy('checkForUpdate').and.resolveTo(false),
    activateUpdate: jasmine.createSpy('activateUpdate').and.resolveTo(false)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SwUpdate, useValue: swUpdate },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } }
      ]
    });
    service = TestBed.inject(VersionCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('does not request an update when service-worker support is disabled', async () => {
    await service.manualCheck();

    expect(swUpdate.checkForUpdate).not.toHaveBeenCalled();
  });
});
