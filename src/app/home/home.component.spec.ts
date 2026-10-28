import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    });
    TestBed.overrideComponent(HomeComponent, {
      add: {
        providers: [
          { provide: AngularFireAnalytics, useValue: { logEvent: jasmine.createSpy('logEvent') } }
        ]
      }
    });
    return TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
