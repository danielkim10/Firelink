import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { TeamService } from '../../services/team-service/team.service';
import { TeamProfileDialogComponent } from '../team-profile-dialog/team-profile-dialog.component';
import { User, Invite, Team } from '../../services/models';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.css']
})
export class TeamSearchComponent implements OnInit {
  recruitingTeams = new MatTableDataSource<any>();
  displayedColumnsRecruitingTeams: string[] = ['logo', 'name', 'averageRank', 'owner', 'members', 'action']
  userDetails: UserDetails;

  constructor(private router: Router, private authenticationService: AuthenticationService, private teamService: TeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.teamService.getActivelyRecruitingTeams().subscribe((teams: Array<Team>) => {
      this.recruitingTeams.data = teams;
      console.log(teams);
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

  submitApplication(user: User, team: Team, type: String) {
    const dialogRef = this.dialog.open(TeamProfileDialogComponent, {
      data: {
        type: type,
        user: user,
        team: team,
      }
    });

    dialogRef.afterClosed().subscribe(res => { 
      console.log(`Result: ${res}`);
      this.update(this.userDetails);
    });
  }

}
