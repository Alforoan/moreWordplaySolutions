//Write a function that takes as an argument a year and returns the winner of the NBA finals that year.

const fs = require("fs");
const csv = require("csv-parser");

function getNBAFinalsWinner(year, callback) {
  const csvFile = "nba_finals.csv";

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row.Year === year) {
        callback(null, row.Winner);
      }
    });
}

const year = "2019";
getNBAFinalsWinner(year, (error, winner) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`The winner of the NBA finals in ${year} was ${winner}.`);
  }
});

//Write a function that takes as an argument a team name and returns an array of all of the years the team has won the NBA finals.

const fs = require("fs");
const csv = require("csv-parser");

function getNBAFinalsYearsForTeam(teamName, callback) {
  const csvFile = "nba_finals.csv";
  const years = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row.Winner === teamName) {
        years.push(row.Year);
      }
    })
    .on("end", () => {
      if (years.length > 0) {
        callback(null, years);
      } else {
        callback(`No data found for team ${teamName}.`, null);
      }
    });
}

const teamName = "Los Angeles Lakers";
getNBAFinalsYearsForTeam(teamName, (error, years) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `The ${teamName} won the NBA finals in the following years: ${years.join(
        ", "
      )}.`
    );
  }
});

const fs = require("fs");
const csv = require("csv-parser");

//Which teams have made it to the NBA finals but have never won?

function getNBATitleWinners(callback) {
  const csvFile = "nba_finals.csv";
  const titleWinners = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const winner = row.Winner.trim();
      titleWinners[winner] = true;
    })
    .on("end", () => {
      callback(null, titleWinners);
    })
    .on("error", (error) => {
      callback(error);
    });
}

getNBATitleWinners((error, titleWinners) => {
  if (error) {
    console.error(error);
    return;
  }

  const csvFile = "nba_finals.csv";
  const participants = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const team1 = row.Winner.trim(); // Assume "Winner" is the team name column
      const team2 = row.Loser.trim(); // Assume "Loser" is the team name column

      participants[team1] = true;
      participants[team2] = true;
    })
    .on("end", () => {
      const nonWinningTeams = Object.keys(participants).filter(
        (team) => !titleWinners[team]
      );

      console.log(
        "Teams that made it to the NBA finals but have never won:",
        nonWinningTeams
      );
    })
    .on("error", (error) => {
      console.error(error);
    });
});

/*
[ ] Print out a ranking of who has won the MVP more than once, by times won, e.g. this output:
    - 6 times: Michael Jordan
    - 3 times: Shaquille O'Neal, LeBron James
    - 2 times: <etc>*/

function getPlayerMVPCount(callback) {
  const csvFile = "nba_finals.csv";
  const mvpCounts = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const mvp = row.MVP;
      if (mvp) {
        if (mvpCounts[mvp]) {
          mvpCounts[mvp]++;
        } else {
          mvpCounts[mvp] = 1;
        }
      }
    })
    .on("end", () => {
      callback(null, mvpCounts);
    });
}

getPlayerMVPCount((error, mvpCounts) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Players who have won the MVP award more than once:");
    const sortedPlayers = Object.keys(mvpCounts).sort(
      (a, b) => mvpCounts[b] - mvpCounts[a]
    );
    sortedPlayers.forEach((player) => {
      if (mvpCounts[player] > 1) {
        console.log(`${mvpCounts[player]} times: ${player}`);
      }
    });
  }
});
