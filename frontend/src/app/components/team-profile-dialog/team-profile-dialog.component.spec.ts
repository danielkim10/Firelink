import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProfileDialogComponent } from './team-profile-dialog.component';

describe('TeamProfileDialogComponent', () => {
  let component: TeamProfileDialogComponent;
  let fixture: ComponentFixture<TeamProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
