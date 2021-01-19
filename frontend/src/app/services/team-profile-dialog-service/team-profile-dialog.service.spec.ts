import { TestBed } from '@angular/core/testing';

import { TeamProfileDialogService } from './team-profile-dialog.service';

describe('TeamProfileDialogService', () => {
  let service: TeamProfileDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamProfileDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
