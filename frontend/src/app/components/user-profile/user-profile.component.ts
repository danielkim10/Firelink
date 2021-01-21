import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService, User, Role, Team, Invite } from '../../services/user-profile-service/user-profile.service';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserProfileService]
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
    owner: '',
    managers: [],
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

  constructor(private router: Router, private authenticationService: AuthenticationService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: any) {

    this.userProfileService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;
      console.log(this.user);

      this.userProfileService.getAdminRoles(false).subscribe((adminRoles: [Role]) => {
        this.roles = adminRoles;

        this.displayedColumnsTeams.push('name');
        this.displayedColumnsTourn.push('name');
        this.displayedColumnsMatch.push('name');
      });
    });
  }

  editProfile() {
    this.userEdit = Object.assign({}, this.user);
    console.log(this.userEdit);
    this.editMode = true;
  }

  onSubmit(form: NgForm) {
    console.log(this.userEdit);
    this.userProfileService.saveUser(this.userEdit).subscribe((res) => {
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
    //this.location.back();
  }

  getOfficialData() {

  }

  markInviteAsOpened() {
    this.userProfileService.inviteOpened(this.selectedInvite).subscribe((res) => {

    });
  }

  acceptInvite(invite: Invite) {
    this.userProfileService.inviteResponse(invite._id).subscribe((res) => {
      
    });
  }

  declineInvite(invite: Invite) {
    this.userProfileService.inviteResponse(invite._id).subscribe((res) => {
      this.userProfileService.deleteIncomingInvite({invite: invite, user: this.user}).subscribe((res) => {
        this.userProfileService.deleteOutgoingInvite({invite: invite, team: this.team}).subscribe((res) => {
        });
      });
    });
  }

}
