import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { TeamService } from '../../services/team-service/team.service';
import { Team } from '../../services/models';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.css']
})
export class TeamSearchComponent implements OnInit {
  teams: Array<Team>;
  userDetails: UserDetails;

  constructor(private router: Router, private authenticationService: AuthenticationService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.teamService.getTeams().subscribe((teams: Array<Team>) => {
      this.teams = teams;
      console.log(teams);
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

}
