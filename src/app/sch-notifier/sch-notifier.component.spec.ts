import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchNotifierComponent } from './sch-notifier.component';

describe('SchNotifierComponent', () => {
  let component: SchNotifierComponent;
  let fixture: ComponentFixture<SchNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
