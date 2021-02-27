import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { RoleService } from '../../services/role-service/role.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { TournamentService } from '../../services/tournament-service/tournament.service';
import { User, Role, Team, Invite, Tournament, Rank } from '../../services/models';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.css']
})
export class TournamentViewComponent implements OnInit {

  @Input() tournament: Tournament;
  teams = new MatTableDataSource<Team>();
  userDetails: UserDetails = null;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService, private teamService: TeamService, 
    private inviteService: InviteService, private roleService: RoleService, 
    private notificationService: NotificationService, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails)
  }

  update(userDetails: UserDetails) {
    this.teamService.getTeams().subscribe((teamData: [Team]) => {
      this.teams.data = teamData;
    });
  }
}
