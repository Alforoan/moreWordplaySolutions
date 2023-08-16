const { log } = require("console");
var fs = require("fs");
var text = fs.readFileSync("./babyNames2020.txt", "utf-8");
var names2020 = text.split("\n");

var text2 = fs.readFileSync("./babyNames1880.txt", "utf-8");
var names1880 = text2.split("\n");

//What is the shortest baby name in the top 40 baby names for 2020?
let shortestName = names2020[0];
for (const name of names2020) {
  if (name.length > 0 && name.length < shortestName.length) {
    shortestName = name;
  }
}

console.log(shortestName);

//What are the longest baby names in the top 40 baby names for 2020? Make sure you can handle if there’s a tie.
let longestName = names2020[0];
const longestNames = [];

for (const name of names2020) {
  if (name.length > 0) {
    if (name.length === longestName.length) {
      longestNames.push(name);
    } else if (name.length > longestName.length) {
      longestNames.length = 0;
      longestName = name;
    }
  }
}

console.log(longestNames);

//There is at least one baby name from the top 40 baby names for 2020 that, when spelled backwards, is a valid Scrabble word. Find and print all such names.
Solve this two ways: first with an array to hold the Scrabble words, and then with a dictionary (or set) to hold the Scrabble words. Use timer functions to measure how long it takes to complete this work under each implementation. Why is the time different?

const scrabbleWords = ["mail", "emma", "ivel"];
const possibleNames = [];

console.time("Array");
for (const name of names2020) {
  let nameLowerCase = name.toLowerCase();
  if (scrabbleWords.includes(nameLowerCase.split("").reverse().join(""))) {
    possibleNames.push(name);
  }
}

console.timeEnd("Array");

console.log(possibleNames);

(0.064ms)

const scrabbleWords = new Set(["mail", "emma", "ivel"]);
const possibleNames = [];

console.time("Set");
for (const name of names2020) {
  let nameLowerCase = name.toLowerCase();
  if (scrabbleWords.has(nameLowerCase.split("").reverse().join(""))) {
    possibleNames.push(name);
  }
}

console.timeEnd("Set");

console.log(possibleNames);

(0.063ms)

Time is different because sets are optimized for fast searching.


//What are all of the names that were top 40 baby names in both 1880 and 2020?
const top40Names = names2020.concat(names1880);
let newTop40Names = [];
for (const name of top40Names) {
  if (name.length === 0) {
    newTop40Names = top40Names.filter((i) => i !== name);
  }
}

console.log(newTop40Names);


