import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService, User, Role, Team } from '../../services/user-profile-service/user-profile.service';
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
    role: '',
    description: '',
    summonerName: '',
    displayName: '',
    teamID: '',
    previousTeamIDs: [],
    recentTournaments: [],
    recentMatches: [],
    active: true,
    freeAgent: false,
  };

  userEdit: User;

  role: Role = {
    _id: '',
    name: '',
  };

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

  constructor(private router: Router, private authenticationService: AuthenticationService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: any) {

    this.userProfileService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;

      this.userProfileService.getRole(userData.role).subscribe((roleData: Role) => {
        this.role = roleData;

        this.userProfileService.getAdminRoles(false).subscribe((adminRoles: [Role]) => {
          this.roles = adminRoles;
          
          
          this.userProfileService.getTeam(userData.teamID).subscribe((teamData: Team) => {
            this.team = teamData;

            this.userProfileService.getTeams(userData.previousTeamIDs).subscribe((teamsData: Array<Team>) => {
              this.teams = teamsData;
              console.log(teamsData);
            });
          });
          
        });
      });
    });
  }

  editProfile() {
    this.userEdit = Object.assign({}, this.user);
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

}
