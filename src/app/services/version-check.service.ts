import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';


@Injectable()
export class VersionCheckService {
    // this will be replaced by actual hash post-build.js
    private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

    constructor(private http: HttpClient, private _snackBar: MatSnackBar, private swUpdate: SwUpdate) {}

    /**
     * Checks in every set frequency the version of frontend application
     * @param url
     * @param {number} frequency - in milliseconds, defaults to 30 minutes
     */
    public initVersionCheck(url, frequency = 1000 * 60) {
        this.swUpdate.available.subscribe(event => {
            this.openSnackBar();
          });
        setInterval(() => {
            // this.showNotification();
            this.swUpdate.checkForUpdate();
            // this.checkVersion(url);
        }, frequency);
    }

    /**
     * Will do the call and check if the hash has changed or not
     * @param url
     */
    private checkVersion(url) {
        // timestamp these requests to invalidate caches
        this.http.get(url + '?t=' + new Date().getTime())
            // .first()
            .subscribe(
                (response: any) => {
                    const hash = response.hash;
                    const hashChanged = this.hasHashChanged(this.currentHash, hash);
                    console.log('hash', hash);
                    // If new version, do something
                    if (hashChanged) {
                        // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
                        // for an example: location.reload();
                        this.openSnackBar();
                    }
                    // store the new hash so we wouldn't trigger versionChange again
                    // only necessary in case you did not force refresh
                    this.currentHash = hash;
                },
                (err) => {
                    console.error(err, 'Could not get version');
                }
            );
    }

    /**
     * Checks if hash has changed.
     * This file has the JS hash, if it is a different one than in the version.json
     * we are dealing with version change
     * @param currentHash
     * @param newHash
     * @returns {boolean}
     */
    private hasHashChanged(currentHash, newHash) {
        if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
            return false;
        }

        return currentHash !== newHash;
    }

    openSnackBar() {
        // this._snackBar.openFromComponent(SnackBarComponent, {
        //   duration: 30 * 60 * 1000 * 6, //3hrs
        // });
        this._snackBar.open('¡Nueva versión disponible!', 'Actualizar').onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
            window.location.reload();
          });
      }
}
