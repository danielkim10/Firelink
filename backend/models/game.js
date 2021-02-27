const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gameSchema = new Schema({
    teamA: { type: Schema.Types.ObjectId, refPath: 'Team', required: true },
    teamARoster: [{ type: Schema.Types.ObjectId, refPath: 'User', required: true }],
    teamB: { type: Schema.Types.ObjectId, refPath: 'Team', required: true },
    teamBRoster: [{ type: Schema.Types.ObjectId, refPath: 'User', required: true }],
    gameNumber: { type: Number, required: true },
    riotGameID: Number,
    gameCreation: Number,
    gameDuration: Number,
    gameVersion: Number,
    status: { type: Number, required: true },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game ;

/*
{
    "gameId": 3783821330,
    "platformId": "NA1",
    "gameCreation": 1613096346617,
    "gameDuration": 716,
    "queueId": 0,
    "mapId": 11,
    "seasonId": 13,
    "gameVersion": "11.3.357.5376",
    "gameMode": "CLASSIC",
    "gameType": "CUSTOM_GAME",
    "teams": [
        {
            "teamId": 100,
            "win": "Win",
            "firstBlood": false,
            "firstTower": true,
            "firstInhibitor": true,
            "firstBaron": false,
            "firstDragon": false,
            "firstRiftHerald": false,
            "towerKills": 5,
            "inhibitorKills": 1,
            "baronKills": 0,
            "dragonKills": 0,
            "vilemawKills": 0,
            "riftHeraldKills": 0,
            "dominionVictoryScore": 0,
            "bans": []
        },
        {
            "teamId": 200,
            "firstBlood": false,
            "firstTower": false,
            "firstInhibitor": false,
            "firstBaron": false,
            "firstDragon": false,
            "firstRiftHerald": false,
            "towerKills": 0,
            "inhibitorKills": 0,
            "baronKills": 0,
            "dragonKills": 0,
            "vilemawKills": 0,
            "riftHeraldKills": 0,
            "dominionVictoryScore": 0,
            "bans": []
        }
    ],
    "participants": [
        {
            "participantId": 1,
            "teamId": 100,
            "championId": 18,
            "spell1Id": 7,
            "spell2Id": 4,
            "stats": {
                "participantId": 1,
                "win": true,
                "item0": 1055, //dblade
                "item1": 0,
                "item2": 6691, //duskblade
                "item3": 1001, //boots
                "item4": 1042, //dagger
                "item5": 0,
                "item6": 3340, //trinket
                "kills": 0,
                "deaths": 0,
                "assists": 0,
                "largestKillingSpree": 0,
                "largestMultiKill": 0,
                "killingSprees": 0,
                "longestTimeSpentLiving": 711,
                "doubleKills": 0,
                "tripleKills": 0,
                "quadraKills": 0,
                "pentaKills": 0,
                "unrealKills": 0,
                "totalDamageDealt": 57384,
                "magicDamageDealt": 10930,
                "physicalDamageDealt": 46454,
                "trueDamageDealt": 0,
                "largestCriticalStrike": 0,
                "totalDamageDealtToChampions": 0,
                "magicDamageDealtToChampions": 0,
                "physicalDamageDealtToChampions": 0,
                "trueDamageDealtToChampions": 0,
                "totalHeal": 456,
                "totalUnitsHealed": 1,
                "damageSelfMitigated": 626,
                "damageDealtToObjectives": 13391,
                "damageDealtToTurrets": 13391,
                "visionScore": 0,
                "timeCCingOthers": 0,
                "totalDamageTaken": 1260,
                "magicalDamageTaken": 0,
                "physicalDamageTaken": 1260,
                "trueDamageTaken": 0,
                "goldEarned": 5800,
                "goldSpent": 4300,
                "turretKills": 5,
                "inhibitorKills": 1,
                "totalMinionsKilled": 112,
                "neutralMinionsKilled": 0,
                "neutralMinionsKilledTeamJungle": 0,
                "neutralMinionsKilledEnemyJungle": 0,
                "totalTimeCrowdControlDealt": 5,
                "champLevel": 10,
                "visionWardsBoughtInGame": 0,
                "sightWardsBoughtInGame": 0,
                "wardsPlaced": 0,
                "wardsKilled": 0,
                "firstTowerKill": true,
                "firstTowerAssist": false,
                "firstInhibitorKill": true,
                "firstInhibitorAssist": false,
                "combatPlayerScore": 0,
                "objectivePlayerScore": 0,
                "totalPlayerScore": 0,
                "totalScoreRank": 0,
                "playerScore0": 0,
                "playerScore1": 0,
                "playerScore2": 0,
                "playerScore3": 0,
                "playerScore4": 0,
                "playerScore5": 0,
                "playerScore6": 0,
                "playerScore7": 0,
                "playerScore8": 0,
                "playerScore9": 0,
                "perk0": 8021,
                "perk0Var1": 193,
                "perk0Var2": 0,
                "perk0Var3": 0,
                "perk1": 9111,
                "perk1Var1": 0,
                "perk1Var2": 0,
                "perk1Var3": 0,
                "perk2": 9103,
                "perk2Var1": 0,
                "perk2Var2": 0,
                "perk2Var3": 0,
                "perk3": 8014,
                "perk3Var1": 0,
                "perk3Var2": 0,
                "perk3Var3": 0,
                "perk4": 8139,
                "perk4Var1": 0,
                "perk4Var2": 0,
                "perk4Var3": 0,
                "perk5": 8135,
                "perk5Var1": 79,
                "perk5Var2": 0,
                "perk5Var3": 0,
                "perkPrimaryStyle": 8000,
                "perkSubStyle": 8100,
                "statPerk0": 5005,
                "statPerk1": 5008,
                "statPerk2": 5002
            },
            "timeline": {
                "participantId": 1,
                "creepsPerMinDeltas": {
                    "0-10": 9.399999999999999
                },
                "xpPerMinDeltas": {
                    "0-10": 488.4
                },
                "goldPerMinDeltas": {
                    "0-10": 450.5
                },
                "damageTakenPerMinDeltas": {
                    "0-10": 47.3
                },
                "role": "SOLO",
                "lane": "NONE"
            }
        }
    ],
    "participantIdentities": [
        {
            "participantId": 1
        }
    ]

    "participantIdentities": [
        {
            "participantId": 1,
            "player": {
                "platformId": "NA1",
                "accountId": "Huc6hw2Qj2-dsnM--x5bc0sQ1L4eTbQ2-FvNO3jBhQymkpyTLg6p4ahk",
                "summonerName": "1 Large Acorn ",
                "summonerId": "SofgWmlOHoWUy4JnvYJWRvMuEqzLwQChErlbgjexgX4wxwfh",
                "currentPlatformId": "NA1",
                "currentAccountId": "Huc6hw2Qj2-dsnM--x5bc0sQ1L4eTbQ2-FvNO3jBhQymkpyTLg6p4ahk",
                "matchHistoryUri": "/v1/stats/player_history/NA1/2063292314970464",
                "profileIcon": 4353
            }
        },
    ]
}
*/