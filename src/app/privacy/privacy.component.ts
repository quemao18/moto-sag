import { Component } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.css'],
    animations: [
        trigger('animate', [
            state('*', style({
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1
            })),
            transition('void => *', [
                style({ opacity: 0, transform: 'translate3D(0px, 150px, 0px)' }),
                animate('0.3s 0s ease-out'),
            ])
        ])
    ],
    standalone: true,
    imports: [TranslateModule, MaterialModule],
})
export class PrivacyComponent {

}
