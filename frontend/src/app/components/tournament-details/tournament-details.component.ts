import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { RoleService } from '../../services/role-service/role.service';
import { InviteService } from '../../services/invite-service/invite.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { TournamentService } from '../../services/tournament-service/tournament.service';
import { RankService } from '../../services/rank-service/rank.service';
import { TournamentDetailsDialogComponent } from '../tournament-details-dialog/tournament-details-dialog.component';
import { User, Role, Team, Invite, Tournament, Rank } from '../../services/models';
import { AuthenticationService, UserDetails } from '../../services/authentication-service/authentication.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  purple: {
    primary: '#6a0dad',
    secondary: '#7F00FF'
  }
}

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.css']
})
export class TournamentDetailsComponent implements OnInit {
  defaultMode: Boolean = true;
  createMode: Boolean = false;
  viewMode: Boolean = false;
  editMode: Boolean = false;
  inCalendarView: Boolean = true;
  userDetails: UserDetails;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  ranks: Array<Rank> = [];
  roles: Array<Role> = [];
  tournaments: Array<Tournament> = [];
  participantTypes: Array<String> = ['Team', 'Individual'];
  participantOptions: Array<Number> = [2, 4, 8, 16, 32, 64];
  formats: Array<String> = ['5v5 Single Elimination', '5v5 Double Elimination', '5v5 Groups', '1v1 Single Elimination', '1v1 Double Elimination', '1v1 Groups'];
  privacyTypes: Array<String> = ['Public', 'Private'];
  tournament: Tournament = {
    _id: '',
    name: '',
    description: '',
    tournamentMasters: [],
    maxParticipants: 2,
    participants: [],
    participantTypes: '',
    startDate: null,
    endDate: null,
    format: '',
    privacy: '',
    rankRestrictionLB: null,
    rankRestrictionUB: null,
    outgoingInvites: [],
    incomingApplications: [],
    matches: [],
    status: '',
  }
  user: User = {
    _id: '',
    username: '',
    email: '',
    role: null,
    description: '',
    twitchUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    discordTag: '',
    active: true,
    freeAgent: false,

    summonerName: '',
    summonerId: '',
    puuid: '',
    summonerLevel: -1,
    profileIconId: -1,
    lastUpdated: null,

    soloTier: '',
    soloRank: null,
    soloLP: -1,
    soloWins: -1,
    soloLosses: -1,

    flexTier: '',
    flexRank: null,
    flexLP: -1,
    flexWins: -1,
    flexLosses: -1,

    team: null,
    previousTeams: [],
    tournaments: [],
    previousTournaments: [],
    previousMatches: [],
    unreadNotifications: [],
    readNotifications: [],
    incomingInvites: [],
    outgoingApplications: [],    
    
    emailVerified: false,
  }
  selectedTournament: Tournament = null;
  tournamentMasters: Array<User> = [];
  tournamentMasterSelect = new FormControl();

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private teamService: TeamService, private roleService: RoleService,
    private inviteService: InviteService, private notificationService: NotificationService, private tournamentService: TournamentService,
    private rankService: RankService, public dialog: MatDialog,
    ) { }

  compare(a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.userService.getUser(userDetails._id).subscribe((userData: User) => {
      this.user = userData;
      this.rankService.getRanks().subscribe((ranks: [Rank]) => {
        this.ranks = ranks.sort(this.compare);

        this.tournamentService.getTournaments().subscribe((tournamentData: [Tournament]) => {
          this.tournaments = tournamentData;
          this.manageEvents(tournamentData);

          this.roleService.getRoleByNameAndAlt('Tournament Master', 'Tournament Master').subscribe((role: Role) => {
            console.log(role);
            this.userService.getTournamentMasters(role).subscribe((tournamentMasters: [User]) => {
              this.tournamentMasters = tournamentMasters;
              console.log(tournamentMasters);
              //this.tournamentMasterSelect.setValue(this.user);
            });
          });
        });
      });
    });
  }

  manageEvents(tournamentData: Array<Tournament>) {
    for (let i = 0; i < tournamentData.length; i++) {
      this.events.push({
        id: i,
        start: new Date(tournamentData[i].startDate), 
        end: new Date(tournamentData[i].endDate), 
        title: tournamentData[i].name.toString(),
        color: tournamentData[i].status === 'Not Started' ? colors.yellow 
          : tournamentData[i].status === 'Canceled' ? colors.red 
          : tournamentData[i].status === 'Ended' ? colors.purple 
          : colors.blue
      });
    }
    console.log(this.events);
    this.refresh.next();
  }

  createTournament() {
    this.defaultMode = false;
    this.createMode = true;
    console.log(new Date());
  }

  onSubmitCreateTournament() {
    this.tournamentService.createTournament(this.tournament).subscribe((res) => {
      this.update(this.userDetails);
    });
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
    this.viewMode = false;
    this.defaultMode = true;
  }

  home() {
    this.router.navigate(['/home']);
  }

  changeView() {
    this.inCalendarView = !this.inCalendarView;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent) {

  }

  handleEvent(action: String, event: CalendarEvent) {
    this.openDialog(this.tournaments[event.id], 'ab', this.user);
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openDialog(tournament: Tournament, type: String, user: User) {
    this.selectedTournament = tournament;
    console.log(this.selectedTournament);
    const dialogRef = this.dialog.open(TournamentDetailsDialogComponent, {
      data: {
        type: type,
        tournament: tournament,
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(`Result: ${res}`);
    });
  }
}
