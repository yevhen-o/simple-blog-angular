import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPostFormComponent } from './add-edit-post-form.component';

describe('AddEditPostFormComponent', () => {
  let component: AddEditPostFormComponent;
  let fixture: ComponentFixture<AddEditPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPostFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
