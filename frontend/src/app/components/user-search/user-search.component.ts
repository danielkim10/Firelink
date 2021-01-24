import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { UserService }  from '../../services/user-service/user.service';
import { User } from '../../services/models';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  userDetails: UserDetails;

  users: Array<User>;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.userService.getUsers().subscribe((users: Array<User>) => {
      this.users = users;
      console.log(this.users);
    });
  }

  back() {
    this.router.navigate(['/home']);
  }
}
