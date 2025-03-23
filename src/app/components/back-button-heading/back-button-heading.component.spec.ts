import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonHeadingComponent } from './back-button-heading.component';

describe('BackButtonHeadingComponent', () => {
  let component: BackButtonHeadingComponent;
  let fixture: ComponentFixture<BackButtonHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackButtonHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
