import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login-service/login.service';
import { AuthenticationService, TokenPayload } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  invalidPassword: String;

  credentials: TokenPayload = {
    email: '',
    username: '',
    password: '',
  };

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/register']);
  }

  clearPassword() {
    this.credentials = {
      email: this.credentials.email,
      username: this.credentials.username,
      password: '',
    }
  }

  onSubmit(form: NgForm) {
    this.authenticationService.login(this.credentials).subscribe(() => {
        this.router.navigate(['/home']);
      }, (err) => {
        this.clearPassword();
        console.error(err);
      });
    }
}
