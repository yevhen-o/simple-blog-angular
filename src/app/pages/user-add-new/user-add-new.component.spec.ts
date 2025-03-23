import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddNewComponent } from './user-add-new.component';

describe('UserAddNewComponent', () => {
  let component: UserAddNewComponent;
  let fixture: ComponentFixture<UserAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
