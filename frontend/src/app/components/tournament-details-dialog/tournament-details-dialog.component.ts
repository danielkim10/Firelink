import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { User, Tournament } from '../../services/models';

export interface DialogData {
  type: String,
  tournament: Tournament,
  user: User,
}

@Component({
  selector: 'app-tournament-details-dialog',
  templateUrl: './tournament-details-dialog.component.html',
  styleUrls: ['./tournament-details-dialog.component.css']
})
export class TournamentDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  confirmAction(type: String) {

  }
}
