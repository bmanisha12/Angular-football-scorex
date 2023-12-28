import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStandingsComponent } from './country-standings.component';

describe('CountryStandingsComponent', () => {
  let component: CountryStandingsComponent;
  let fixture: ComponentFixture<CountryStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryStandingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
