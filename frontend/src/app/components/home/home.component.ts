import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

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
