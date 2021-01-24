import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { TeamService } from '../../services/team-service/team.service';
import { UserService } from '../../services/user-service/user.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { User, Team, Invite } from '../../services/models';

export interface DialogData {
  type: String,
  member: User,
  team: Team,
}

@Component({
  selector: 'app-team-profile-dialog',
  templateUrl: './team-profile-dialog.component.html',
  styleUrls: ['./team-profile-dialog.component.css']
})
export class TeamProfileDialogComponent implements OnInit {
  status: String = '';
  statuses: Array<String> = ['Member', 'Manager', 'Owner'];
  invite: Invite = {
    _id: '',
    sender: null,
    onSender: '',
    recipient: null,
    onRecipient: '',
    date: null,
    subject: '',
    message: '',
    responseReceived: false,
    opened: false,
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService, private teamService: TeamService, private inviteService: InviteService) { }

  ngOnInit(): void {
    if (this.data.member._id === this.data.team.owner._id) {
      this.status = 'Owner';
    }
    else if (this.data.team.managers.some(e => e._id === this.data.member._id)) {
      this.status = 'Manager';
    }
    else {
      this.status = 'Member';
    }
  }

  confirmAction(type: String) {
    if (type === 'add') {
      this.teamService.addMember({team: this.data.team, user: this.data.member}).subscribe((res) => {
        console.log(this.data.member);
        this.userService.addToTeam({team: this.data.team, user: this.data.member}).subscribe((res) => {

        });
      });
    }
    else if (type === 'status') {
      this.teamService.changeStatus({team: this.data.team, user: this.data.member, status: this.status}).subscribe((res) => {

      });
    }
    else if (type === 'invite') {
      this.inviteService.createInviteForUser({ invite: this.invite, senderId: this.data.team._id, recipientId: this.data.member._id }).subscribe((inviteData: Invite) => {
        this.teamService.teamSendsInvite({ team: this.data.team, invite: inviteData }).subscribe((res) => {
          this.userService.receiveTeamInvite({ user: this.data.member, invite: inviteData }).subscribe((res1) => {

          });
        });
      });
    }
  }

  onSubmitInviteUser(form: NgForm) {

  }

}
