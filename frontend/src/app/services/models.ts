export interface User {
    _id: String,
    username: String,
    email: String,
    role: Role,
    description: String,
    summonerName: String,
    displayName: String,
    teamID: Team,
    previousTeamIDs: Array<Team>,
    recentTournaments: Array<Tournament>,
    recentMatches: Array<Match>,
    incomingNotifications: Array<Notification>,
    incomingInvites: Array<Invite>,
    active: Boolean,
    freeAgent: Boolean,
  }

export interface Team {
  _id: String;
  name: String;
  tag: String;
  logo: String;
  owner: User;
  managers: Array<User>;
  playerRoster: Array<User>;
  coachRoster: Array<User>;
  active: Boolean;
  matchHistory: Array<Match>;
  tournamentHistory: Array<Tournament>;
  activelyRecruiting: Boolean;
  dateCreated: Date;
  incomingNotifications: Array<Notification>;
  incomingInvites: Array<Invite>;
  outgoingInvites: Array<Invite>;
  incomingApplications: Array<Invite>;
}

export interface Role {
  _id: String,
  name: String,
}

export interface Tournament {

}

export interface Match {

}

export interface Notification {

}

export interface Invite {
  _id: String;
  sender: any;
  onSender: String;
  recipient: any;
  onRecipient: String;
  date: Date;
  subject: String;
  message: String;
  responseReceived: Boolean;
  opened: Boolean;
}