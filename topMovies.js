const fs = require("fs");
const csv = require("csv-parser");

//What movies on this list were distributed by DreamWorks?

function dreamworksMovies(company, callback) {
  const csvFile = "top_movies.csv";
  const dreamworksMovies = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row.Distributor === company) {
        dreamworksMovies.push(row.Title);
      }
    })
    .on("end", () => {
      callback(null, dreamworksMovies);
    });
}

const company = "DreamWorks Distribution";
dreamworksMovies(company, (error, movies) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `The movies distributed by ${company} are ${movies.join(", ")}.`
    );
  }
});

const fs = require("fs");
const csv = require("csv-parser");

//What is the highest grossing movie from Universal Pictures, domestically?

function highestDomesticGross(company, callback) {
  const csvFile = "top_movies.csv";
  let highestGross = 0;
  let highestGrossMovie = "";

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (
        row.Distributor === company &&
        parseInt(row["US Sales"]) > highestGross
      ) {
        highestGross = parseInt(row["US Sales"]);
        highestGrossMovie = row.Title;
      }
    })
    .on("end", () => {
      callback(null, highestGrossMovie);
    })
    .on("error", (error) => {
      callback(error);
    });
}

const company = "Walt Disney Studios Motion Pictures";
highestDomesticGross(company, (error, highestGrossMovie) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `The highest grossing movie from ${company}, domestically, is "${highestGrossMovie}".`
    );
  }
});

const fs = require("fs");
const csv = require("csv-parser");

//What distributor has the most films on this list?

function findMostFrequentDistributor(callback) {
  const csvFile = "top_movies.csv";
  const distributorCounts = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const distributor = row.Distributor;
      if (distributor) {
        if (distributorCounts[distributor]) {
          distributorCounts[distributor]++;
        } else {
          distributorCounts[distributor] = 1;
        }
      }
    })
    .on("end", () => {
      let mostFrequentDistributor = null;
      let maxCount = 0;

      for (const distributor in distributorCounts) {
        if (distributorCounts[distributor] > maxCount) {
          mostFrequentDistributor = distributor;
          maxCount = distributorCounts[distributor];
        }
      }

      callback(null, mostFrequentDistributor);
    });
}

findMostFrequentDistributor((error, distributor) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `The distributor with the most films on the list is: ${distributor}`
    );
  }
});

const fs = require("fs");
const csv = require("csv-parser");

//What is the earliest year on this list, and what were the films from that year?

function findEarliestYearFilms(callback) {
  const csvFile = "top_movies.csv";
  let earliestYear = Infinity;
  const filmsFromEarliestYear = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const releaseDate = row["Release Date"];
      const year = parseInt(releaseDate, 10);

      if (!isNaN(year)) {
        if (year < earliestYear) {
          earliestYear = year;
          filmsFromEarliestYear.length = 0;
        }
        if (year === earliestYear) {
          filmsFromEarliestYear.push(row.Title);
        }
      }
    })
    .on("end", () => {
      if (earliestYear === Infinity) {
        callback("No valid year found in the data.", null, []);
      } else {
        callback(null, earliestYear, filmsFromEarliestYear);
      }
    });
}

findEarliestYearFilms((error, year, films) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`The earliest year on the list is ${year}.`);
    console.log(`The films from that year are: ${films.join(", ")}.`);
  }
});

const fs = require("fs");
const csv = require("csv-parser");

//What is the distribution of ratings? (How many are PG, PG-13, R, etc.?)

function calculateRatingDistribution(callback) {
  const csvFile = "top_movies.csv";
  const ratingDistribution = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      const rating = row.Rating;
      if (rating) {
        if (ratingDistribution[rating]) {
          ratingDistribution[rating]++;
        } else {
          ratingDistribution[rating] = 1;
        }
      }
    })
    .on("end", () => {
      callback(null, ratingDistribution);
    });
}

calculateRatingDistribution((error, distribution) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Distribution of ratings:");
    for (const rating in distribution) {
      console.log(`${rating}: ${distribution[rating]}`);
    }
  }
});
