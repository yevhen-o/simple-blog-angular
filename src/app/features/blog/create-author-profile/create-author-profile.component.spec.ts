import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorProfileComponent } from './create-author-profile.component';

describe('CreateAuthorProfileComponent', () => {
  let component: CreateAuthorProfileComponent;
  let fixture: ComponentFixture<CreateAuthorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAuthorProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuthorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
