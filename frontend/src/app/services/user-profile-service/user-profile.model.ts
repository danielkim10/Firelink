export class UserProfile {
    _id: String;
    username: String;
    email: String;
    role: String;
    description: String;
    summonerName: String;
    displayName: String;
    teamID: String;
    previousTeamIDs: [String];
    recentTournaments: [String];
    recentMatches: [String];
    active: Boolean;
    freeAgent: Boolean;
}