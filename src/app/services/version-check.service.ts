import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';


@Injectable()
export class VersionCheckService {
    // this will be replaced by actual hash post-build.js
    private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

    constructor(private _snackBar: MatSnackBar, private swUpdate: SwUpdate) {}

    /**
     * Checks in every set frequency the version of frontend application
     * @param url
     * @param {number} frequency - in milliseconds, defaults to 30 minutes
     */
    public initVersionCheck(url, frequency = 1000 * 60) {
        setInterval(() => {
            this.checkForUpdates();
        }, frequency);
    }

    private checkForUpdates(): void {
        console.log('Check for updates');
        if (this.swUpdate.isEnabled) {
          this.swUpdate.versionUpdates.pipe(
            filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY')
          ).subscribe(event => {
            console.log(`Current version is ${event.currentVersion.hash}`);
            console.log(`New version is ${event.latestVersion.hash}`);
            if (event.currentVersion.hash !== event.latestVersion.hash) {
                this.openSnackBar();
            }
          });
        }
    }

    openSnackBar() {
        this._snackBar.open('¡Nueva versión disponible!', 'Actualizar').onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
            window.location.reload();
          });
      }
}
