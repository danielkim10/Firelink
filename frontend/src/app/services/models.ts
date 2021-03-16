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
    teamJoinDate: Date,
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
  _id: String,
  name: String,
  tag: String,
  logo: String,
  description: String,
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordUrl: String,
  active: Boolean;
  activelyRecruiting: Boolean,
  dateCreated: Date,
  dateDisbanded: Date,

  owner: User,
  managers: Array<User>,
  playerRoster: Array<User>,
  coachRoster: Array<User>,
  averageRank: Rank,
  
  previousMembers: Array<TeamMember>,
  previousMatches: Array<Match>,
  previousTournaments: Array<Tournament>,
  
  incomingInvites: Array<Invite>,
  outgoingInvites: Array<Invite>,
  incomingApplications: Array<Invite>,
}

export interface TeamMember {
  _id: String,
  user: User,
  team: Team,
  joinDate: Date,
  leftDate: Date,
  gamesPlayed: Number,
  wins: Number,
  active: Boolean
}

export interface Role {
  _id: String,
  name: String,
  alt: String,
  admin: Boolean,
  image: String,
}

export interface Tournament {
  _id: String,
  name: String,
  description: String,
  tournamentMasters: Array<User>,
  maxParticipants: Number,
  participants: Array<Team | User>,
  participantTypes: String,
  startDate: Date,
  endDate: Date,
  format: String,
  privacy: String,
  rankRestrictionLB: Rank,
  rankRestrictionUB: Rank,
  outgoingInvites: Array<Invite>,
  incomingApplications: Array<Invite>,
  matches: Array<Match>
  status: String,
}

export interface Match {
  _id: String,
  number: Number,
  games: Array<Game>,
  tournament: Tournament,
  teamA: Team,
  teamB: Team,
  date: Date,
  teamAScore: Number,
  teamBScore: Number,
  maximumMatches: Number,
  status: String,
  matchParent: Match,
  matchChildren: Array<Match>,
}

export interface Game {
  _id: String,
  teamA: Team,
  teamARoster: Array<User>,
  teamB: Team,
  teamBRoster: Array<User>,
  gameNumber: Number,
  riotGameID: Number,
  gameCreation: Number,
  gameDuration: Number,
  gameVersion: Number,
  status: Number,
}

export interface Notification {
  _id: String;
  date: Date;
  subject: String;
  message: String;
}

export interface Invite {
  _id: String;
  sender: Team | Tournament,
  senderType: String,
  recipient: Team | User,
  recipientType: String,
  date: Date,
  subject: String,
  message: String,
  responseReceived: Boolean,
  opened: Boolean,
}

export interface Rank {
  _id: String;
  name: String;
  value: Number;
  image: String;
}