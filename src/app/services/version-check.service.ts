import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { interval } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  constructor(private _snackBar: MatSnackBar, private swUpdate: SwUpdate) {
    (window as any).swUpdate = swUpdate;
    // Convenience alias to trigger manual checks from the console: window.swManualCheck()
    (window as any).swManualCheck = () => this.manualCheck();
    // Expose diagnostics helper
    (window as any).swDiag = () => this.diagnostics();

    if (!('serviceWorker' in navigator)) {
      console.warn('[PWA] Service workers are not supported by this browser or context (non-secure origin?).');
    }
    if (this.swUpdate.isEnabled) {
      interval(1000 * 60).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
      this.checkForUpdates();
    } else {
      console.warn('[PWA] SwUpdate is disabled (probably because environment.production is false or SW not registered).');
    }
  }

  private checkForUpdates(): void {
    this.swUpdate.versionUpdates
      .pipe(
        tap((e) => console.log('[PWA] versionUpdates event:', e.type, e)),
        filter(
          (event): event is VersionReadyEvent =>
            event.type === "VERSION_READY"
        ),
        map(event => {
          console.log(`Current version is ${event.currentVersion.hash}`);
          console.log(`New version is ${event.latestVersion.hash}`);
          if (event.currentVersion.hash !== event.latestVersion.hash) {
            this.openSnackBar();
          }
        })
      )
      .subscribe();
  }

  // Helper to trigger a manual check with guard, useful from DevTools: window.swManualCheck()
  public async manualCheck(): Promise<void> {
    if (!this.swUpdate.isEnabled) {
      console.warn('[PWA] Cannot check for updates because SwUpdate is disabled. Ensure you are on a production build served over HTTPS (or localhost) and that ServiceWorkerModule is enabled.');
      return;
    }
    try {
      console.log('[PWA] manual checkForUpdate()');
      await this.swUpdate.checkForUpdate();
    } catch (e) {
      console.warn('[PWA] checkForUpdate threw:', e);
    }
  }

  openSnackBar() {
    this._snackBar
      .open("¡Nueva versión disponible!", "Actualizar")
      .onAction()
      .subscribe(() => {
        console.log("The snack-bar action was triggered!");
        this.swUpdate.activateUpdate().finally(() => window.location.reload());
      });
  }

  private diagnostics() {
    const ctrl = (navigator as any).serviceWorker?.controller;
    console.log('[PWA] diag:', {
      swEnabled: this.swUpdate.isEnabled,
      hasController: !!ctrl,
      controller: ctrl,
      location: window.location.href,
      secureContext: window.isSecureContext,
    });
  }
}
