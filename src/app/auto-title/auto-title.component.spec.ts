import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTitleComponent } from './auto-title.component';

describe('AutoTitleComponent', () => {
  let component: AutoTitleComponent;
  let fixture: ComponentFixture<AutoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
