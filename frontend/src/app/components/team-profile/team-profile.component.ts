import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamProfileService, User, Team, Role } from '../../services/team-profile-service/team-profile.service';
import { TeamProfileDialogComponent } from '../team-profile-dialog/team-profile-dialog.component';
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
  inviteMemberMode: Boolean = false;
  userCanEdit: Boolean = false;
  userDetails: UserDetails;
  members: Array<any> = [];
  displayedColumnsTeams: string[] = ['username', 'summonerName', 'role', 'status'];
  displayedColumnsTourn: string[] = ['name', 'place'];
  displayedColumnsMatch: string[] = ['name', 'score', 'tournament'];
  displayedColumnsInvite: string[] = ['username', 'summonerName', 'role', 'position'];
  user: User = {
    _id: '',
    username: '',
    role: null,
    teamID: null,
  };
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
  tournaments: Array<any> = [];
  matches: Array<any> = [];

  constructor(private router: Router, private authenticationService: AuthenticationService, private teamProfileService: TeamProfileService, public dialog: MatDialog) { }

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
        console.log(userData.teamID._id);
        if (userData.teamID !== null) {
          this.teamProfileService.getTeam(userData.teamID._id).subscribe((teamData: Team) => {
            this.team = teamData;
            console.log(this.team);
            for (let player in teamData.playerRoster) {
              this.members.push(teamData.playerRoster[player]);
            }
            for (let coach in teamData.coachRoster) {
              this.members.push(teamData.coachRoster[coach]);
            }
            console.log(this.members);
            if (this.team.owner._id === this.user._id || this.team.managers.includes(this.user._id)) {
              this.userCanEdit = true;
            }

            this.teamProfileService.getFreeAgents().subscribe((users: [User]) => {
              this.users = users;
              console.log(this.users);

              this.displayedColumnsTeams.push('action');
              this.displayedColumnsTourn.push('date');
              this.displayedColumnsMatch.push('date');
              this.displayedColumnsInvite.push('action');
            });
          });
        } 
      });
    });
  }

  createTeam() {
    this.createMode = true;
  }

  testClick() {
    console.log('yes');
  }

  onSubmitCreateTeam(form: NgForm) {
    this.teamProfileService.createTeam({ team: this.team, user: this.user }).subscribe((teamData: Team) => {
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
    this.inviteMemberMode = false;
    this.defaultMode = true;
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
    console.log(this.users);
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
    this.inviteMemberMode = true;
    this.defaultMode = false;
  }

  home() {
    this.router.navigate(['/home']);
  }

  openDialog(member: User, team: Team, type: String) {
    const dialogRef = this.dialog.open(TeamProfileDialogComponent, {
      data: {
        type: type,
        member: member,
        team: team,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(`Result: ${res}`);
      this.addMemberMode = false;
      this.inviteMemberMode = false;
      this.update(this.userDetails);
    });
  }

  getRoleName(user: User) {
    if (this.team.owner._id === user._id) {
      return 'Owner';
    }
    else if (this.team.managers.some(e => e._id === user._id)) {
      return 'Manager';
    }
    return 'Member';
  }

}
