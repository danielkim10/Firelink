import { TestBed } from '@angular/core/testing';

import { TeamProfileService } from './team-profile.service';

describe('TeamProfileService', () => {
  let service: TeamProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
