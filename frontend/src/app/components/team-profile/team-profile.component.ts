import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { RoleService } from '../../services/role-service/role.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { User, Role, Team, Invite, TeamMember, Match, Tournament } from '../../services/models';
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
  //members: Array<any> = [];
  
  displayedColumnsTeams: string[] = ['username', 'summonerName', 'role', 'status', 'action'];
  displayedColumnsTourn: string[] = ['name', 'place', 'date'];
  displayedColumnsMatch: string[] = ['name', 'score', 'tournament'];
  displayedColumnsInvite: string[] = ['username', 'summonerName', 'role', 'position', 'action'];
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
    teamJoinDate: null,
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
  team: Team = {
    _id: '',
    name: '',
    tag: '',
    logo: 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/1/1.png',
    description: '',
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
  };

  teamEdit: Team;
  selectedUser: User = {
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
    teamJoinDate: null,
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
  users = new MatTableDataSource<User>();
  members = new MatTableDataSource<any>();
  previousMembers = new MatTableDataSource<User>();
  tournaments = new MatTableDataSource<Tournament>();
  matches = new MatTableDataSource<Match>();

  roles: Array<Role> = [];
  
  //matches: Array<any> = [];

  teamIcons: Array<String> = 
  [
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/1/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/2/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/3/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/4/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/5/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/6/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/7/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/8/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/9/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/10/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/11/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/12/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/13/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/14/1.png',
    'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/clash/roster-logos/15/1.png',
  ];

  constructor(private router: Router, private authenticationService: AuthenticationService, public dialog: MatDialog,
    private userService: UserService, private teamService: TeamService, private roleService: RoleService, private inviteService: InviteService,
    private notificationService: NotificationService
  ) { }
  
  compare(a, b) {
    if (a.teamJoinDate < b.teamJoinDate) {
      return -1;
    }
    if (a.teamJoinDate > b.teamJoinDate) {
      return 1;
    }
    return 0;
  }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    let members = [];
    this.userService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;

      this.roleService.getAdminRoles(false).subscribe((roleData: [Role]) => {
        this.roles = roleData;

        if (userData.team !== null) {
          this.teamService.getTeam(userData.team._id).subscribe((teamData: Team) => {
            this.team = teamData;
            console.log(this.team);
            for (let player in teamData.playerRoster) {
              members.push(teamData.playerRoster[player]);
            }
            for (let coach in teamData.coachRoster) {
              members.push(teamData.coachRoster[coach]);
            }
            members.sort(this.compare);
            this.members.data = members;
            console.log(this.members.data);

            // if (this.team.owner._id === this.user._id || this.team.managers.includes(this.user)) {
            //   this.userCanEdit = true;
            // }

            if (this.team.owner._id === this.user._id) {
              this.userCanEdit = true;
            }

            fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/1.json').then(res => res.json())
            .then((out) => {
              //console.log('Output: ', out);
            }).catch(err => console.error(err));
            //console.log(JSON.stringify('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/1.json'));

            this.userService.getFreeAgents().subscribe((users: [User]) => {
              this.users.data = users;
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

  onSubmitCreateTeam() {
    this.teamService.createTeam({ team: this.team, user: this.user }).subscribe((teamData: Team) => {
      this.user.team = teamData;
      this.userService.addToTeam({user: this.user, team: teamData}).subscribe((userData: User) => {
        this.userService.createTeamMember(this.user, teamData).subscribe((teamMember: TeamMember) => {
          this.createMode = false;
          this.update(this.userDetails);
        });
      })
    }, (err) => {
      console.error(err);
    })
  }

  onSubmitEditTeam() {
    console.log(this.teamEdit);
    this.teamService.editTeam(this.teamEdit).subscribe((res) => {
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
    this.teamService.leaveTeam({team: this.team, user: this.user}).subscribe((res) => {
      this.userService.removeFromTeam(this.user).subscribe((res1) => {
        this.update(this.userDetails);
      });
    });
  }

  disbandTeam() {
    this.teamService.disbandTeam(this.team).subscribe((res) => {
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
    this.selectedUser.team = this.team;
  }

  confirmAddMember() {
    this.teamService.addMember({team: this.team, user: this.selectedUser}).subscribe((res) => {
      this.userService.addToTeam({team: this.team, user: this.selectedUser}).subscribe((res) => {
        this.userService.createTeamMember(this.selectedUser, this.team).subscribe((teamMember: TeamMember) => {
          console.log(teamMember);
          this.addMemberMode = false;
          this.update(this.userDetails);
        }, (err2) => {
          console.error(err2);
        });
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

  openDialog(user: User, team: Team, type: String) {
    const dialogRef = this.dialog.open(TeamProfileDialogComponent, {
      data: {
        type: type,
        user: user,
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

  changeTeamLogo(logo: String) {
    this.team.logo = logo;
  }

  changeTeamEditLogo(logo: String) {
    this.teamEdit.logo = logo;
  }
}
