import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';

import { NavComponent } from './nav.component';
import { StateService } from 'app/shared/services/state/state.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [StateService, OktaAuthStateService, InjectionToken]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Nav', () => {
    expect(component).toBeTruthy();
  });
});
