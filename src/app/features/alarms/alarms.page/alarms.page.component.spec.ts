import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsPageComponent } from './alarms.page.component';

describe('AlarmsPageComponent', () => {
  let component: AlarmsPageComponent;
  let fixture: ComponentFixture<AlarmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
