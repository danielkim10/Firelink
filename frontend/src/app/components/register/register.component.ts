import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, TokenPayload } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {
  readonly url = 'http://localhost:3000/users'

  credentials: TokenPayload = {
    email: '',
    username: '',
    password: '',
  }

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['']);
  }

  onSubmit(form: NgForm) {
    this.authenticationService.register(this.credentials).subscribe(() => {
      this.router.navigate(['']);
    }, (err) => {
      console.error(err);
    })
  }

}
