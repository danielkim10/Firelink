import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailsDialogComponent } from './tournament-details-dialog.component';

describe('TournamentDetailsDialogComponent', () => {
  let component: TournamentDetailsDialogComponent;
  let fixture: ComponentFixture<TournamentDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
