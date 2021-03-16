import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { UserService }  from '../../services/user-service/user.service';
import { TeamProfileDialogComponent } from '../team-profile-dialog/team-profile-dialog.component';
import { User, Invite, Team } from '../../services/models';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  userDetails: UserDetails;

  freeAgents = new MatTableDataSource<any>();
  displayedColumnsFreeAgents: string[] = ['username', 'summonerName', 'rank', 'position', 'action'];

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.userService.getFreeAgents().subscribe((users: Array<User>) => {
      this.freeAgents.data = users;
      console.log(this.freeAgents.data);
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

  inviteUser(user: User, team: Team, type: String) {
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
