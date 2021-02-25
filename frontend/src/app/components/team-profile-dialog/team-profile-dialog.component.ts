import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { TeamService } from '../../services/team-service/team.service';
import { UserService } from '../../services/user-service/user.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { User, Team, Invite, Notification } from '../../services/models';

export interface DialogData {
  type: String,
  user: User,
  team: Team,
}

@Component({
  selector: 'app-team-profile-dialog',
  templateUrl: './team-profile-dialog.component.html',
  styleUrls: ['./team-profile-dialog.component.css']
})
export class TeamProfileDialogComponent implements OnInit {
  status: String = '';
  team: String = '';
  statuses: Array<String> = ['Member', 'Manager', 'Owner'];
  invite: Invite = {
    _id: '',
    sender: null,
    senderType: '',
    recipient: null,
    recipientType: '',
    date: null,
    subject: '',
    message: '',
    responseReceived: false,
    opened: false,
  }
  notification: Notification = {
    _id: '',
    date: null,
    subject: '',
    message: '',
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router,  private userService: UserService, private teamService: TeamService, 
  private inviteService: InviteService, private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.data.user._id === this.data.team.owner._id) {
      this.status = 'Owner';
    }
    else if (this.data.team.managers.some(e => e._id === this.data.user._id)) {
      this.status = 'Manager';
    }
    else {
      this.status = 'Member';
    }
  }

  confirmAction(type: String) {
    if (type === 'add') {
      this.teamService.addMember({team: this.data.team, user: this.data.user}).subscribe((res) => {
        console.log(this.data.user);
        this.userService.addToTeam({team: this.data.team, user: this.data.user}).subscribe((res) => {

        });
      });
    }
    else if (type === 'status') {
      this.notification.subject = 'Team Update';
      this.notification.message = `Your status in team ${this.data.team.name} has been updated from A to ${this.status}`

      this.teamService.changeStatus({team: this.data.team, user: this.data.user, status: this.status}).subscribe((res) => {

      });
    }
    else if (type === 'invite') {
      this.notification.subject = 'Team Invite';
      this.notification.message = `You have been invited to join the team '${this.data.team.name}'`;

      this.inviteService.createInviteForUser({ invite: this.invite, senderId: this.data.team._id, recipientId: this.data.user._id }).subscribe((inviteData: Invite) => {
        this.teamService.teamSendsInvite({ team: this.data.team, invite: inviteData }).subscribe((res) => {
          this.userService.receiveTeamInvite({ user: this.data.user, invite: inviteData }).subscribe((res1) => {
            this.notificationService.createNotification(this.notification).subscribe((notificationData: Notification) => {
              this.userService.newUnreadNotification({notification: notificationData, user: this.data.user}).subscribe((res2) => {

              });
            });
          });
        });
      });
    }
    else if (type === 'leave') {
      this.notification.subject = 'Team Update';
      this.notification.message = `${this.data.user.username} has left your team ${this.data.team.name}`;

      this.teamService.leaveTeam({team: this.data.team, user: this.data.user}).subscribe((res) => {
        this.userService.removeFromTeam(this.data.user).subscribe((res1) => {
          this.router.navigate(['/team']);
        });
      });
    }

    else if (type === 'kick') {
      this.notification.subject = 'Team Update';
      this.notification.message = `You have been kicked from the team '${this.data.team.name}'`;
      
      this.teamService.leaveTeam({})
    }

    else if (type === 'disband') {
      if (this.team !== this.data.team.name) {
        return;
      }
      this.notification.subject = 'Team Update';
      this.notification.message = `Your team '${this.data.team.name}' has been disbanded`;
      
    }
  }

  onSubmitInviteUser(form: NgForm) {

  }

}
