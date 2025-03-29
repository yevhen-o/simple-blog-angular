import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidTextComponent } from './invalid-text.component';

describe('InvalidTextComponent', () => {
  let component: InvalidTextComponent;
  let fixture: ComponentFixture<InvalidTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
