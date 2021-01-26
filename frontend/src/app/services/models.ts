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
    unreadNotifications: Array<Notification>,
    readNotifications: Array<Notification>,
    incomingInvites: Array<Invite>,
    active: Boolean,
    freeAgent: Boolean,
    twitchUrl: String,
    twitterUrl: String,
    youtubeUrl: String,
    discordTag: String,
    emailVerified: Boolean,
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
  incomingInvites: Array<Invite>;
  outgoingInvites: Array<Invite>;
  incomingApplications: Array<Invite>;
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordUrl: String,
}

export interface Role {
  _id: String,
  name: String,
}

export interface Tournament {
  _id: String,
  name: String,
  description: String,
  tournamentMasters: Array<User>,
  maxParticipants: Number,
  participants: Array<any>,
  onParticipants: String,
  startDate: Date,
  endDate: Date,
  format: String,
  privacy: String,
  rankRestrictionLB: String,
  rankRestrictionUB: String,
  status: String,
}

export interface Match {

}

export interface Notification {
  _id: String;
  date: Date;
  subject: String;
  message: String;
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