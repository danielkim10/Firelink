import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentSearchComponent } from './tournament-search.component';

describe('TournamentSearchComponent', () => {
  let component: TournamentSearchComponent;
  let fixture: ComponentFixture<TournamentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
