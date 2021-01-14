import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamSearchService, Team } from '../../services/team-search-service/team-search.service';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.css']
})
export class TeamSearchComponent implements OnInit {
  teams: Array<Team>;
  userDetails: UserDetails;

  constructor(private router: Router, private authenticationService: AuthenticationService, private teamSearchService: TeamSearchService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.teamSearchService.getTeams().subscribe((teams: Array<Team>) => {
      this.teams = teams;
      console.log(teams);
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

}
