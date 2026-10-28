import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { TranslateModule } from '@ngx-translate/core';
import { NavComponent } from '../nav/nav.component';

import { SagComponent } from './sag.component';

describe('SagComponent', () => {
  let component: SagComponent;
  let fixture: ComponentFixture<SagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SagComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: NavComponent, useValue: { dark: false } }
      ]
    });
    TestBed.overrideComponent(SagComponent, {
      add: {
        providers: [
          { provide: AngularFireAnalytics, useValue: { logEvent: jasmine.createSpy('logEvent') } }
        ]
      }
    });
    return TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculates rear sag and marks measurements in the recommended range', () => {
    const openResultDialog = spyOn(component, 'openResultDialog');
    component.sagRearForm.setValue({
      raFormControl: 600,
      rbFormControl: 565,
      rcFormControl: 500
    });

    component.getSagRear();

    expect(component.dataSourceRear.sagE).toBe(35);
    expect(component.dataSourceRear.sagD).toBe(100);
    expect(component.dataSourceRear.errorE).toBeFalse();
    expect(component.dataSourceRear.errorD).toBeFalse();
    expect(openResultDialog).toHaveBeenCalledWith('rear');
  });
});
