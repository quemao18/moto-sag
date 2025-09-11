import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
    selector: 'app-sag-result-dialog',
    templateUrl: './sag-result-dialog.component.html',
    styleUrls: ['./sag-result-dialog.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatDialogModule,
        MatGridListModule,
        MatCardModule,
        MaterialModule
    ],
    animations: [
        trigger('animate', [
            state('*', style({
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out'),
            ])
        ]),
        trigger('flip', [
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'rotateY(180deg)',
                }),
                animate('0.3s 0s ease-out'),
            ])
        ])
    ],
})
export class SagResultDialogComponent {
    readonly dialogRef = inject(MatDialogRef<SagResultDialogComponent>);
    readonly data = inject<any>(MAT_DIALOG_DATA);

    constructor(
        private analytics: AngularFireAnalytics,
    ) {
        this.analytics.logEvent('sag_results_opened', { type: this.data.sagD ? 'rear' : 'front' });
    }

    close(): void {
        this.dialogRef.close();
    }
}