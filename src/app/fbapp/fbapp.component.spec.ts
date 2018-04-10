import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbappComponent } from './fbapp.component';

describe('FbappComponent', () => {
  let component: FbappComponent;
  let fixture: ComponentFixture<FbappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
