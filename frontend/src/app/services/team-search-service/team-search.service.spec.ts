import { TestBed } from '@angular/core/testing';

import { TeamSearchService } from './team-search.service';

describe('TeamSearchService', () => {
  let service: TeamSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
