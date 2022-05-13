import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilevalidateComponent } from './filevalidate.component';

describe('FilevalidateComponent', () => {
  let component: FilevalidateComponent;
  let fixture: ComponentFixture<FilevalidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilevalidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilevalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
