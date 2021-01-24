import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Role, Team, Invite } from '../../services/models';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { RoleService } from '../../services/role-service/role.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  editMode: Boolean = false;
  userDetails: any;
  user: User = {
    _id: '',
    username: '',
    email: '',
    role: null,
    description: '',
    summonerName: '',
    displayName: '',
    teamID: null,
    previousTeamIDs: [],
    recentTournaments: [],
    recentMatches: [],
    incomingNotifications: [],
    incomingInvites: [],
    active: true,
    freeAgent: false,
  };

  userEdit: User;

  team: Team = {
    _id: '',
    name: '',
    tag: '',
    logo: '',
    owner: null,
    managers: [],
    playerRoster: [],
    coachRoster: [],
    active: true,
    matchHistory: [],
    tournamentHistory: [],
    activelyRecruiting: false,
    dateCreated: null,
    incomingNotifications: [],
    incomingInvites: [],
    outgoingInvites: [],
    incomingApplications: [],
  }
  teams: Array<Team>;
  roles: Array<Role>;
  tournaments: Array<any>;
  matches: Array<any>;
  notifications: Array<any>;
  invites: Array<any>;
  selectedInvite: String;

  displayedColumnsTeams: string[] = [];
  displayedColumnsTourn: string[] = [];
  displayedColumnsMatch: string[] = [];

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    private userService: UserService, private teamService: TeamService, private roleService: RoleService, private inviteService: InviteService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: any) {

    this.userService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;
      console.log(this.user);

      this.roleService.getAdminRoles(false).subscribe((adminRoles: [Role]) => {
        this.roles = adminRoles;

        this.displayedColumnsTeams.push('name');
        this.displayedColumnsTourn.push('name');
        this.displayedColumnsMatch.push('name');

        
      });
    });
  }

  editProfile() {
    this.userEdit = Object.assign({}, this.user);
    this.editMode = true;
  }

  onSubmit(form: NgForm) {
    this.userService.saveUser(this.userEdit).subscribe((res) => {
      this.editMode = false;
      this.update(this.userDetails);
    }, (err) => {
      console.error(err);
    });
  }

  deactivate() {

  }

  stopEditing() {
    this.editMode = false;
  }

  home() {
    this.router.navigate(['/home']);
  }

  getOfficialData() {

  }

  markInviteAsOpened() {
    this.inviteService.inviteOpened(this.selectedInvite).subscribe((res) => {

    });
  }

  acceptInvite(invite: Invite) {
    this.inviteService.inviteResponse(invite._id).subscribe((res) => {
      this.userService.deleteIncomingInvite({invite: invite, user: this.user}).subscribe((res) => {

        this.teamService.getTeam(invite.sender).subscribe((team: Team) => {
          this.teamService.deleteOutgoingInvite({invite: invite, team: team}).subscribe((res) => {
            this.teamService.addMember({user: this.user, team: team}).subscribe((res) => {
              this.userService.addToTeam({user: this.user, team: team}).subscribe((res) => {

              });
            });
          });
        });
      });
    });
  }

  declineInvite(invite: Invite) {
    this.inviteService.inviteResponse(invite._id).subscribe((res) => {
      this.userService.deleteIncomingInvite({invite: invite, user: this.user}).subscribe((res) => {

        this.teamService.getTeam(invite.sender).subscribe((team: Team) => {
          console.log(team);
          this.teamService.deleteOutgoingInvite({invite: invite, team: team}).subscribe((res) => {
            
          });
        });
      });
    });
  }

}
