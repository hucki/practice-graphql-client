# Worldcup 2018
## in short:
simple Client for GraphQL Exercise made with koa
## usage
choose a Match from a dropdown list and look at the result (work in progress).
## Settings
The GraphQL Server is defined in script.js with variables host/port (defaults to localhost 4000).
following queries will be send to the GraphQL server:
```
  {
    getMatches {
      id
      date
      home_team {
        name
        emoji_string
      }
      away_team {
        name
        emoji_string
      }
    }
  }
  // -> should return an array of all matches
```

```
   {
    getMatch (id:${id}) {
      id
      date
      home_score
      away_score
      home_penalty
      away_penalty
      winner
      loser
      home_scorers
      away_scorers
      stadium {
        name
        city
      }
      home_team {
        name
        emoji_string
        flag
      }
      away_team {
        name
        emoji_string
        flag
      }
    }
  }
  // -> should return details for one Match
```