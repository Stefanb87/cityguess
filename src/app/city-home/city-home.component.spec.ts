import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityHomeComponent } from './city-home.component';

describe('CityHomeComponent', () => {
  let component: CityHomeComponent;
  let fixture: ComponentFixture<CityHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
