import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamProfileService, User, Team, Role } from '../../services/team-profile-service/team-profile.service';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamProfileComponent implements OnInit {
  defaultMode: Boolean = true;
  createMode: Boolean = false;
  editMode: Boolean = false;
  addMemberMode: Boolean = false;
  userCanEdit: Boolean = false;
  userDetails: UserDetails;
  members: Array<any> = [];
  user: User = {
    _id: '',
    username: '',
    role: '',
    teamID: '',
  };
  team: Team = {
    _id: '',
    name: '',
    tag: '',
    logo: '',
    owner: '',
    managers: [],
    playerRoster: [],
    coachRoster: [],
    active: true,
    matchHistory: [],
    tournamentHistory: [],
    activelyRecruiting: false,
    dateCreated: null,
  };

  teamEdit: Team;
  selectedUser: User = {
    _id: '',
    username: '',
    role: '',
    teamID: '',
  };
  users: Array<User> = [];

  roles: Array<Role> = [];

  constructor(private router: Router, private authenticationService: AuthenticationService, private teamProfileService: TeamProfileService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.members = [];
    this.teamProfileService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;

      this.teamProfileService.getAdminRoles(false).subscribe((roleData: [Role]) => {
        this.roles = roleData;

        if (userData.teamID !== '') {
          this.teamProfileService.getTeam(userData.teamID).subscribe((teamData: Team) => {
            this.team = teamData;
            
            for (let player in teamData.playerRoster) {
              this.members.push({_id: teamData.playerRoster[player], name: teamData.playerRoster[player]});
            }
            for (let coach in teamData.coachRoster) {
              this.members.push({_id: teamData.coachRoster[coach], name: teamData.coachRoster[coach]});
            }
            if (this.team.owner === this.user._id || this.team.managers.includes(this.user._id)) {
              this.userCanEdit = true;
            }

            this.teamProfileService.getFreeAgents().subscribe((users: [User]) => {
              this.users = users;
              console.log(this.users);
            });
          });
        } 
      });
    });
  }

  createTeam() {
    this.createMode = true;
  }

  onSubmitCreateTeam(form: NgForm) {
    this.team.owner = this.userDetails._id;
    this.teamProfileService.createTeam({team: this.team, user: this.user, roles: this.roles}).subscribe((teamData: Team) => {
      this.user.teamID = teamData._id;
      console.log(teamData._id);
      this.teamProfileService.updateUser(this.user).subscribe((userData: User) => {
        
        this.createMode = false;
        this.update(this.userDetails);
      })
    }, (err) => {
      console.error(err);
    })
  }

  onSubmitEditTeam(form: NgForm) {
    this.teamProfileService.editTeam(this.teamEdit).subscribe((res) => {
      this.editMode = false;
      this.update(this.userDetails);
    }, (err) => {
      console.error(err);
    })
  }

  back() {
    this.createMode = false;
    this.editMode = false;
    this.addMemberMode = false;
  }

  editTeam() {
    this.teamEdit = Object.assign({}, this.team);
    this.editMode = true;
  }

  leaveTeam() {
    this.teamProfileService.leaveTeam({team: this.team, user: this.user}).subscribe((res) => {
      this.teamProfileService.removeFromTeam(this.user).subscribe((res1) => {
        console.log(res1);
        this.update(this.userDetails);
      });
    });
  }

  disbandTeam() {
    this.teamProfileService.disbandTeam(this.team).subscribe((res) => {
      console.log(res);
    });

    this.update(this.userDetails);
  }

  addMember() {
    this.addMemberMode = true;
    this.defaultMode = false;
  }

  onNgModelChange(event) {
    this.selectedUser._id = event[0]._id;
    this.selectedUser.role = event[0].role;
    this.selectedUser.teamID = this.team._id;
    console.log(this.selectedUser._id);
  }

  confirmAddMember() {
     this.teamProfileService.addMember({team: this.team, user: this.selectedUser}).subscribe((res) => {
      this.teamProfileService.updateUser(this.selectedUser).subscribe((res) => {
        this.addMemberMode = false;
        this.update(this.userDetails);
      }, (err1) => {
        console.error(err1);
      });
     }, (err) => {
       console.error(err);
   });
  }

  inviteMember() {
    
  }

  home() {
    this.router.navigate(['/home']);
  }

}
