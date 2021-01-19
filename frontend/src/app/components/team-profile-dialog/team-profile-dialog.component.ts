import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamProfileService, Invite } from '../../services/team-profile-service/team-profile.service';
import { TeamProfileDialogService } from '../../services/team-profile-dialog-service/team-profile-dialog.service';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';

import  User from '../../../../../backend/models/user';
import Team from '../../../../../backend/models/team';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private teamProfileService: TeamProfileService, private teamProfileDialogService: TeamProfileDialogService) { }

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
      this.teamProfileDialogService.addMember({team: this.data.team, user: this.data.member}).subscribe((res) => {
        this.teamProfileDialogService.updateUser(this.data.member).subscribe((res) => {

        });
      });
    }
    else if (type === 'status') {
      this.teamProfileService.changeStatus({team: this.data.team, user: this.data.member, status: this.status}).subscribe((res) => {

      });
    }
    else if (type === 'invite') {
      this.teamProfileService.createInviteForUser({ invite: this.invite, senderId: this.data.team._id, recipientId: this.data.member._id }).subscribe((inviteData: Invite) => {
        this.teamProfileService.teamSendsInvite({ team: this.data.team, invite: inviteData }).subscribe((res) => {
          this.teamProfileService.userReceivesTeamInvite({ user: this.data.member, invite: inviteData }).subscribe((res1) => {

          });
        });
      });
    }
  }

  onSubmitInviteUser(form: NgForm) {

  }

}
