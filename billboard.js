/*
[ ] Print out all of the #1 songs and the artists who made them. If a song was #1 for more than one week, only print it once. Example output:
    These were the number one songs of 2000:
    "Try Again" - Aaliyah
    "Say My Name" - Destiny's Child
    "What A Girl Wants" - Christina Aguilera
    "Maria Maria" - Santana Featuring The Product G&B
    "Smooth" - Santana Featuring Rob Thomas
    "Independent Women Part I" - Destiny's Child*/

const fs = require("fs");
const csv = require("csv-parser");

function printNumberOneSongs(callback) {
  const csvFile = "billboard100_2000.csv";
  const numberOneSongs = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const rank = parseInt(row.rank, 10);
      const song = row.song;
      const artist = row.artist;

      if (rank === 1) {
        numberOneSongs[song] = artist;
      }
    })
    .on("end", () => {
      callback(null, numberOneSongs);
    });
}

printNumberOneSongs((error, numberOneSongs) => {
  if (error) {
    console.error(error);
  } else {
    console.log("These were the number one songs:");
    for (const song in numberOneSongs) {
      console.log(`"${song}" - ${numberOneSongs[song]}`);
    }
  }
});

//What song was the #1 song for the most weeks of 2000, who was the artist, and how many weeks was it at #1?

const fs = require("fs");
const csv = require("csv-parser");

function findMostWeeksAtNumberOne(callback) {
  const csvFile = "billboard100_2000.csv";
  const mostWeeksInfo = { song: "", artist: "", weeks: 0 };

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const rank = parseInt(row.rank, 10);
      const song = row.song;
      const artist = row.artist;
      const weeksAtNumberOne = parseInt(row["peak-rank"], 10);

      if (rank === 1 && weeksAtNumberOne > mostWeeksInfo.weeks) {
        mostWeeksInfo.song = song;
        mostWeeksInfo.artist = artist;
        mostWeeksInfo.weeks = weeksAtNumberOne;
      }
    })
    .on("end", () => {
      callback(null, mostWeeksInfo);
    });
}

findMostWeeksAtNumberOne((error, mostWeeksInfo) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `The #1 song with the most weeks in 2000 was "${mostWeeksInfo.song}" by ${mostWeeksInfo.artist}.`
    );
    console.log(`It was at #1 for ${mostWeeksInfo.weeks} weeks.`);
  }
});

//What artist had the most songs chart in 2000, and what were those songs?

const fs = require("fs");
const csv = require("csv-parser");

function findArtistWithMostChartedSongs(callback) {
  const csvFile = "billboard100_2000.csv";
  const artistSongsMap = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const artist = row.artist;
      const song = row.song;

      if (!artistSongsMap[artist]) {
        artistSongsMap[artist] = [];
      }

      artistSongsMap[artist].push(song);
    })
    .on("end", () => {
      let mostChartedArtist = "";
      let mostChartedCount = 0;

      for (const artist in artistSongsMap) {
        const chartedCount = artistSongsMap[artist].length;
        if (chartedCount > mostChartedCount) {
          mostChartedArtist = artist;
          mostChartedCount = chartedCount;
        }
      }

      callback(null, mostChartedArtist, artistSongsMap[mostChartedArtist]);
    });
}

findArtistWithMostChartedSongs((error, artist, songs) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `The artist with the most songs charted in 2000 was ${artist}.`
    );
    console.log(`The songs by ${artist} are:`);
    songs.forEach((song, index) => {
      console.log(`${index + 1}. "${song}"`);
    });
  }
});

//What song(s) were on the charts (anywhere on the charts) for the most weeks of 2000?

const fs = require("fs");
const csv = require("csv-parser");

function findSongsWithMostWeeksOnCharts(callback) {
  const csvFile = "billboard100_2000.csv";
  const songWeeksMap = {}; // { song: weeks }

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const song = row.song;
      const weeksOnBoard = parseInt(row["weeks-on-board"], 10);

      if (!isNaN(weeksOnBoard)) {
        if (!songWeeksMap[song]) {
          songWeeksMap[song] = 0;
        }
        songWeeksMap[song] += weeksOnBoard;
      }
    })
    .on("end", () => {
      let mostWeeksSong = "";
      let mostWeeks = 0;

      for (const song in songWeeksMap) {
        const weeks = songWeeksMap[song];
        if (weeks > mostWeeks) {
          mostWeeksSong = song;
          mostWeeks = weeks;
        }
      }

      callback(null, mostWeeksSong, mostWeeks);
    });
}

findSongsWithMostWeeksOnCharts((error, song, weeks) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`The song(s) with the most weeks on the charts in 2000:`);
    console.log(`"${song}" - ${weeks} weeks`);
  }
});
