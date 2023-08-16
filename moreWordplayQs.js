//What are all of the words that have only “U”s for vowels?
const uWords = [];

for (const word of words) {
  if (
    word.includes("U") &&
    !word.includes("A") &&
    !word.includes("E") &&
    !word.includes("I") &&
    !word.includes("O")
  ) {
    uWords.push(word);
  }
}

console.log(uWords);

//What are all of the words that have only “E”s for vowels and are at least 15 letters long?

const eWords = [];

for (const word of words) {
  if (
    word.includes("E") &&
    !word.includes("A") &&
    !word.includes("U") &&
    !word.includes("I") &&
    !word.includes("O") &&
    word.length >= 15
  ) {
    eWords.push(word);
  }
}

console.log(eWords);

//What are all of the words that start with “PRO”, end in “ING”, and are exactly 11 letters long?

const proIngWords = [];

for (const word of words) {
  if (word.startsWith("PRO") && word.endsWith("ING")) {
    proIngWords.push(word);
  }
}

console.log(proIngWords);

//What are all of the words that can be made from only the letters in “RSTLNE”? Not all of those letters need to be used, and letters can be repeated.

const rstlneWords = [];
const rstlne = ["R", "S", "T", "L", "N", "E"];

for (const word of words) {
  let hasRstlne = true;
  for (const letter of word) {
    if (!rstlne.includes(letter)) {
      hasRstlne = false;
      break;
    }
  }
  if (hasRstlne) {
    rstlneWords.push(word);
  }
}

console.log(rstlneWords);

//What is the longest word that can be made from only the letters in “RSTLNE”? Not all of those letters need to be used, and letters can be repeated. Make sure your solution can handle ties.

const rstlneWords = [];
const rstlne = ["R", "S", "T", "L", "N", "E"];
const longestRstlneWords = [];

for (const word of words) {
  let hasRstlne = true;
  for (const letter of word) {
    if (!rstlne.includes(letter)) {
      hasRstlne = false;
      break;
    }
  }
  if (hasRstlne) {
    rstlneWords.push(word);
  }
}
let longestWord = rstlneWords[0];
longestRstlneWords.push(longestWord);

for (const word of rstlneWords) {
  if (word.length === longestWord.length) {
    longestRstlneWords.push(word);
  } else if (word.length > longestWord.length) {
    longestWord = word;
    longestRstlneWords.length = 0;
    longestRstlneWords.push(word);
  }
}

console.log(longestRstlneWords);

//What is the longest word that can be made without the letters in “AEIOSHRTN” (in other words, without the most common letters)? Make sure your solution can handle ties.

const noAEIOSHRTNWords = [];
let letters = ["A", "E", "I", "O", "S", "H", "R", "T", "N"];

for (const word of words) {
  let hasAEIOSHRTN = false;
  for (const letter of word) {
    if (letters.includes(letter)) {
      hasAEIOSHRTN = true;
      break;
    }
  }
  if (!hasAEIOSHRTN) {
    noAEIOSHRTNWords.push(word);
  }
}

console.log(noAEIOSHRTNWords);

/*
[ ] Let’s assign letters the following points:
    - W = 12
    - Z = 15
    - E = -17
    - All other letters = 1

What are all of the words with at least 50 points?*/

const fiftyPointsWords = [];
for (const word of words) {
  let total = 0;
  for (const letter of word) {
    if (letter === "W") {
      total += 12;
    } else if (letter === "Z") {
      total += 15;
    } else if (letter === "E") {
      total -= 17;
    } else {
      total += 1;
    }
  }
  if (total >= 0) {
    fiftyPointsWords.push(word);
  }
}

console.log(fiftyPointsWords);

//Write a function that takes a string substring as an argument and returns an array of all of the words that contain that substring (the substring can appear anywhere in the word).
function returnString(substring) {
  const possibleWords = [];
  for (const word of words) {
    if (word.toLowerCase().includes(substring)) {
      possibleWords.push(word);
    }
  }
  return possibleWords;
}

console.log(returnString("aba"));

//Write a function that takes a string prefix as an argument and returns an array of all of the words that start with that prefix (the prefix has to be at the beginning of the word).

function returnString(prefix) {
  const possibleWords = [];
  for (const word of words) {
    if (word.toLowerCase().startsWith(prefix)) {
      possibleWords.push(word);
    }
  }
  return possibleWords;
}

console.log(returnString("aba"));

//Write a function that takes a string prefix as the first argument, a string suffix as the second argument, and an integer length as the third argument. It should return an array of all of the words that start with that prefix, end with that suffix, and are that length.

function returnString(prefix, suffix, length) {
  const possibleWords = [];
  for (const word of words) {
    if (
      word.toLowerCase().startsWith(prefix.toLowerCase()) &&
      word.toLowerCase().endsWith(suffix.toLowerCase()) &&
      word.length === length
    ) {
      possibleWords.push(word);
    }
  }
  return possibleWords;
}

console.log(returnString("aba", "s", 5));

//Write a function that takes a string word as an argument and returns a count of all of the “A”s in that string.

function returnACount(string) {
  let count = 0;
  for (const letter of string) {
    if (letter === "A" || letter === "a") {
      count++;
    }
  }
  return count;
}

console.log(returnACount("afoijwfelaaA"));

//Write a function that takes a string word as the first argument, a string letter as the second argument, and returns a count of how many times letter occurs in word.

function returnCount(string, stringLetter) {
  let count = 0;
  for (const letter of string.toLowerCase()) {
    if (letter === stringLetter.toLowerCase()) {
      count++;
    }
  }
  return count;
}

console.log(returnCount("afoijwfelaaA", "I"));

//Write a function that takes a string phrase and returns a dictionary containing counts of how many times every character appears in phrase.

function returnCount(phrase) {
  const charCount = {};

  for (const char of phrase) {
    if (char != " ") {
      if (charCount[char]) {
        charCount[char]++;
      } else {
        charCount[char] = 1;
      }
    }
  }

  return charCount;
}

const phrase = "hi there";
const counts = returnCount(phrase);

console.log(counts);
