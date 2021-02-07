export interface User {
    _id: String,
    username: String,
    email: String,
    role: Role,
    description: String,
    twitchUrl: String,
    twitterUrl: String,
    youtubeUrl: String,
    discordTag: String,
    active: Boolean,
    freeAgent: Boolean,
    
    summonerName: String,
    summonerId: String,
    puuid: String,
    summonerLevel: Number,
    profileIconId: Number,
    lastUpdated: Date,

    soloTier: String,
    soloRank: Rank,
    soloLP: Number,
    soloWins: Number,
    soloLosses: Number,

    flexTier: String,
    flexRank: Rank,
    flexLP: Number,
    flexWins: Number,
    flexLosses: Number,

    team: Team,
    previousTeams: Array<Team>,
    tournaments: Array<Tournament>,
    previousTournaments: Array<Tournament>,
    previousMatches: Array<Match>,
    unreadNotifications: Array<Notification>,
    readNotifications: Array<Notification>,
    incomingInvites: Array<Invite>,
    outgoingApplications: Array<Invite>,
    
    emailVerified: Boolean,
  }

export interface Team {
  _id: String;
  name: String;
  tag: String;
  logo: String;
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordUrl: String,
  active: Boolean;
  activelyRecruiting: Boolean;
  dateCreated: Date;
  dateDisbanded: Date;

  owner: User;
  managers: Array<User>;
  playerRoster: Array<User>;
  coachRoster: Array<User>;
  averageRank: Rank,
  
  previousMembers: Array<User>;
  previousMatches: Array<Match>;
  previousTournaments: Array<Tournament>;
  
  incomingInvites: Array<Invite>;
  outgoingInvites: Array<Invite>;
  incomingApplications: Array<Invite>;
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
  participantTypes: String,
  startDate: Date,
  endDate: Date,
  format: String,
  privacy: String,
  rankRestrictionLB: Rank,
  rankRestrictionUB: Rank,
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
  senderType: String;
  recipient: any;
  recipientType: String;
  date: Date;
  subject: String;
  message: String;
  responseReceived: Boolean;
  opened: Boolean;
}

export interface Rank {
  _id: String;
  name: String;
  value: Number;
  image: String;
}

export interface Position {
  _id: String;
  name: String;
  image: String;
}