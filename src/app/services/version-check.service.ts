import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { interval } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  constructor(private _snackBar: MatSnackBar, private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      interval(1000 * 60).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
      this.checkForUpdates();
    }
  }

  private checkForUpdates(): void {
      this.swUpdate.versionUpdates
        .pipe(
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

  openSnackBar() {
    this._snackBar
      .open("¡Nueva versión disponible!", "Actualizar")
      .onAction()
      .subscribe(() => {
        console.log("The snack-bar action was triggered!");
        window.location.reload();
      });
  }
}
