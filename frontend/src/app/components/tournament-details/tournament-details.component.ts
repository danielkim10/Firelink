import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { RoleService } from '../../services/role-service/role.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { TournamentService } from '../../services/tournament-service/tournament.service';
import { User, Role, Team, Invite, Tournament } from '../../services/models';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.css']
})
export class TournamentDetailsComponent implements OnInit {
  defaultMode: Boolean = true;
  createMode: Boolean = false;
  ranks: Array<String> = ['None', 'Challenger', 'Grandmaster', 'Master', 'Diamond 1', 'Diamond 2', 'Diamond 3', 'Diamond 4', 'Platinum 1', 'Platinum 2', 'Platinum 3', 'Platinum 4',
                          'Gold 1', 'Gold 2', 'Gold 3', 'Gold 4', 'Silver 1', 'Silver 2', 'Silver 3', 'Silver 4', 'Bronze 1', 'Bronze 2', 'Bronze 3', 'Bronze 4', 'Iron 1', 'Iron 2', 'Iron 3', 'Iron 4'];
  participantTypes: Array<String> = ['Team', 'Individual'];
  participantOptions: Array<Number> = [2, 4, 8, 16, 32, 64];
  formats: Array<String> = ['Single Elimination', 'Double Elimination', 'Groups'];
  privacyTypes: Array<String> = ['Public', 'Private'];
  tournament: Tournament = {
    _id: '',
    name: '',
    description: '',
    tournamentMasters: [],
    maxParticipants: 2,
    participants: [],
    onParticipants: '',
    startDate: null,
    endDate: null,
    format: '',
    privacy: '',
    rankRestrictionLB: '',
    rankRestrictionUB:'',
    status: '',
  }

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private teamService: TeamService, private roleService: RoleService,
    private inviteService: InviteService, private notificationService: NotificationService, private tournamentService: TournamentService
    ) { }

  ngOnInit(): void {
  }

  createTournament() {
    this.defaultMode = false;
    this.createMode = true;
  }

  onSubmitCreateTournament() {
    console.log(this.tournament);
  }

  changeStartDate(event: MatDatepickerInputEvent<Date>) {
    this.tournament.startDate = event.value;
  }

  changeEndDate(event: MatDatepickerInputEvent<Date>) {
    this.tournament.endDate = event.value;
  }

  back() {
    this.createMode = false;
    this.defaultMode = true;
  }

  home() {
    this.router.navigate(['/home']);
  }
}
