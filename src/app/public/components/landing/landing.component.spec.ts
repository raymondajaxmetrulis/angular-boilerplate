import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OktaAuthStateService } from '@okta/okta-angular';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      providers: [ OktaAuthStateService, InjectionToken ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LandingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
