import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/user-service/user.service';
import { TeamService } from '../../services/team-service/team.service';
import { TournamentService } from '../../services/tournament-service/tournament.service';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication-service/authentication.service';
import { User, Role, Team, Tournament } from '../../services/models';

@Component({
  selector: 'app-tournament-search',
  templateUrl: './tournament-search.component.html',
  styleUrls: ['./tournament-search.component.css']
})
export class TournamentSearchComponent implements OnInit {

  userDetails: UserDetails;
  displayedColumns: string[] = ['name', 'format', 'numParticipants', 'minRank', 'maxRank', 'startDate', 'endDate', 'privacy', 'action'];
  tournaments = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService, 
              private teamService: TeamService, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.userDetails = this.authenticationService.getUserDetails();
    
    this.update(this.userDetails);
  }

  update(userDetails: UserDetails) {
    this.tournamentService.getTournaments().subscribe((tournaments: [Tournament]) => {      
      this.tournaments.data = tournaments;
      this.tournaments.paginator = this.paginator;
      this.tournaments.sort = this.sort;
    });
  }

  convertDateToLocaleString(date: Date): String {
    return new Date(date).toLocaleDateString("en-US");
  }

  viewTournament(tournament: Tournament): void {

  }

  registerForTournament(user: User, tournament: Tournament): void {

  }
}
