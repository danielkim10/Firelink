import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../services/models';

export interface DialogData {
  type: String,
  user: User,
}

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {
  email: String = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  confirmAction(type: String) {
    if (type === 'deactivate') {
      if (this.email !== this.data.user.email) {
        return;
      }
      this.userService.deactivateUser(this.data.user).subscribe((res) => {
        this.authenticationService.logout();
      });
    }
  }

}
