import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User, Role, Team, Invite, Notification } from '../../services/models';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { RoleService } from '../../services/role-service/role.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

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
    twitchUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    discordTag: '',
    active: true,
    freeAgent: false,

    summonerName: '',
    summonerId: '',
    puuid: '',
    summonerLevel: -1,
    profileIconId: -1,
    lastUpdated: null,

    soloTier: '',
    soloRank: null,
    soloLP: -1,
    soloWins: -1,
    soloLosses: -1,

    flexTier: '',
    flexRank: null,
    flexLP: -1,
    flexWins: -1,
    flexLosses: -1,

    team: null,
    previousTeams: [],
    tournaments: [],
    previousTournaments: [],
    previousMatches: [],
    unreadNotifications: [],
    readNotifications: [],
    incomingInvites: [],
    outgoingApplications: [],
    
    
    emailVerified: false,
  };

  userEdit: User;

  team: Team = {
    _id: '',
    name: '',
    tag: '',
    logo: '',
    twitchUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    discordUrl: '',
    active: true,
    activelyRecruiting: false,
    dateCreated: null,
    dateDisbanded: null,

    owner: null,
    managers: [],
    playerRoster: [],
    coachRoster: [],
    averageRank: null,
    
    previousMembers: [],
    previousMatches: [],
    previousTournaments: [],
    
    incomingInvites: [],
    outgoingInvites: [],
    incomingApplications: [],
    
  }
  teams: Array<Team>;
  roles: Array<Role>;
  tournaments: Array<any>;
  matches: Array<any>;
  notifications: Array<Notification>;
  invites: Array<any>;
  selectedInvite: String;

  displayedColumnsTeams: string[] = [];
  displayedColumnsTourn: string[] = [];
  displayedColumnsMatch: string[] = [];

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    private userService: UserService, private teamService: TeamService, private roleService: RoleService, private inviteService: InviteService,
    private notificationService: NotificationService, public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: any) {
    this.notifications = [];
    this.userService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;
      console.log(this.user);
      for (let notification in this.user.unreadNotifications) {
        this.notifications.push(this.user.unreadNotifications[notification]);
      }
      for (let notification in this.user.readNotifications) {
        this.notifications.push(this.user.readNotifications[notification]);
      }
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

  openDialog(user: User, type: String) {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      data: {
        type: type,
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(`Result: ${res}`);
    })
  }

}
