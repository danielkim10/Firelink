import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Firelink';
  timedOutCloser;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  profile() {
    this.router.navigate(['/profile']);
  }

  team() {
    this.router.navigate(['/team']);
  }

  teamSearch() {
    this.router.navigate(['/teamsearch']);
  }

  userSearch() {
    this.router.navigate(['/usersearch']);
  }

  tournament() {
    this.router.navigate(['/tournament']);
  }

  tournamentSearch() {
    this.router.navigate(['/tournamentsearch']);
  }

  logout() {
    this.authenticationService.logout();
  }
}
