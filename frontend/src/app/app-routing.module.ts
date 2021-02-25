import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamProfileComponent } from './components/team-profile/team-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TeamSearchComponent } from './components/team-search/team-search.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';
import { TournamentSearchComponent } from './components/tournament-search/tournament-search.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'team', component: TeamProfileComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'teamsearch', component: TeamSearchComponent },
  { path: 'usersearch', component: UserSearchComponent },
  { path: 'tournament', component: TournamentDetailsComponent },
  { path: 'tournamentsearch', component: TournamentSearchComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
