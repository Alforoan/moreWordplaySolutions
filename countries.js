var fs = require("fs");
var text = fs.readFileSync("./countries.txt", "utf-8");
var countries = text.split("\n");

const possibleCountries = [];

//What are all of the countries that have “United” in the name?
for (let i = 0; i < countries.length; i++) {
  const country = countries[i];
  if (country.toUpperCase().includes("UNITED")) {
    possibleCountries.push(country);
  }
}

console.log(possibleCountries);

//What countries both begin and end with a vowel?
const possibleCountries = [];
const vowels = ["A", "E", "I", "O", "U"];
for (const country of countries) {
  if (country && country.length > 0) {
    const firstLetter = country[0].toUpperCase();
    const lastLetter = country[country.length - 1].toUpperCase();
    if (vowels.includes(firstLetter) && vowels.includes(lastLetter)) {
      possibleCountries.push(country);
    }
  }
}

console.log(possibleCountries);

//What country names are > 50% vowels?
const possibleCountries = [];
const vowels = ["A", "E", "I", "O", "U"];
for (const country of countries) {
  let vowelCount = 0;
  if (country && country.length > 0) {
    const upperCountry = country.toUpperCase(); // Convert the country name to uppercase
    for (const letter of upperCountry) {
      if (vowels.includes(letter)) {
        vowelCount++;
      }
    }
    if (vowelCount / upperCountry.length > 0.5) {
      possibleCountries.push(country);
    }
  }
}

console.log(possibleCountries);

//What is the shortest country name? Make sure your solution can handle ties.

const possibleCountries = [];
let shortestCountry = countries[0];
for (const country of countries) {
  if (country.length > 0) {
    if (country.length === shortestCountry.length) {
      possibleCountries.push(country);
    } else if (country.length < shortestCountry.length) {
      shortestCountry = country;
      possibleCountries.length = 0;
      possibleCountries.push(shortestCountry);
    }
  }
}

console.log(possibleCountries);

/*What countries use only one vowel in their name (the vowel can be used multiple times)
    - For example, if the word “BEEKEEPER” were a country, it would be an answer, because it only uses “E”.*/

const possibleCountries = [];
for (const country of countries) {
  const upperCountry = country.toUpperCase();

  let vowelSet = new Set();
  const vowels = ["A", "E", "I", "O", "U"];
  for (letter of upperCountry) {
    if (vowels.includes(letter)) {
      vowelSet.add(letter);
    }
  }
  if (vowelSet.size === 1) {
    possibleCountries.push(country);
  }
}

console.log(possibleCountries);

//There is at least one country name that contains another country name. Find all of these cases.

const countryNames = [];

for (const country of countries) {
  for (const otherCountry of countries) {
    if (
      country !== "" &&
      country !== otherCountry &&
      otherCountry.includes(country)
    ) {
      countryNames.push(`${country} in ${otherCountry}`);
    }
  }
}

console.log(countryNames);
