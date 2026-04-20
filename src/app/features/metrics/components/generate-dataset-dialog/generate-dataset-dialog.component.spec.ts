import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDatasetDialogComponent } from './generate-dataset-dialog.component';

describe('GenerateDatasetDialogComponent', () => {
  let component: GenerateDatasetDialogComponent;
  let fixture: ComponentFixture<GenerateDatasetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateDatasetDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateDatasetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
