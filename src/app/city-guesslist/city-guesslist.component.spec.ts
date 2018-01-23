import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityGuesslistComponent } from './city-guesslist.component';

describe('CityGuesslistComponent', () => {
  let component: CityGuesslistComponent;
  let fixture: ComponentFixture<CityGuesslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityGuesslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityGuesslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
