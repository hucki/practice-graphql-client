const host = 'localhost';
const port = 4000;

async function setOptions () {
  const query = `{
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
  }`
  const result = await fetch(`http://${host}:${port}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: query})
})
  .then(r => r.json())
  .then(data => data);
  const allMatches = JSON.parse(JSON.stringify(result)).data.getMatches
  for (let i = 0; i < allMatches.length; i++) {
    let curMatch = allMatches[i];
    let curDate = new Date(curMatch.date);
    let curOption = `${curDate.getDate()}.${curDate.getMonth()+1}.: ${curMatch.home_team.emoji_string} ${curMatch.home_team.name} vs. ${curMatch.away_team.name} ${curMatch.away_team.emoji_string}`;
    document.getElementById('match-selector').append(new Option(curOption, curMatch.id))
  }
}

async function getMatchData (id) {
  const query = `{
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
  }`
  const result = await fetch(`http://${host}:${port}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: query})
})
  .then(r => r.json())
  .then(data => data);
  const curMatch = JSON.parse(JSON.stringify(result)).data.getMatch
  let curDate = new Date(curMatch.date);
  document.getElementById('match-result').innerHTML = `${curMatch.home_team.name} ${curMatch.home_score} : ${curMatch.away_score} ${curMatch.away_team.name}`;
  document.getElementById('stadium-container').innerHTML = `${curMatch.stadium.name}, ${curMatch.stadium.city}`;
  document.getElementById('home-flag').src = curMatch.home_team.flag;
  document.getElementById('away-flag').src = curMatch.away_team.flag;
  //let curOption = `${curDate.getDate()}.${curDate.getMonth()+1}.: ${curMatch.home_team.emoji_string} ${curMatch.home_team.name} vs. ${curMatch.away_team.name} ${curMatch.away_team.emoji_string}`;
  //document.getElementById('match-selector').append(new Option(curOption, curMatch.id))

}

document
  .getElementById('match-selector')
  .addEventListener('change', event => {
    getMatchData(event.target.value);
  })

setOptions();
