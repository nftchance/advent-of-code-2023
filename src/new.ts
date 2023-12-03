// * This file is a helper to create the files for a new day of advent of code.
// * Creates day.{day}.ts, day.{day}.txt, and day.{day}.2.txt
//
// * Usage: `pnpm create {day}`

import { writeFileSync } from "fs";

const day = process.argv[2];

const dayFile = `// Path: day.${day}.ts

import { readFileSync } from "fs";

const partOneStringsFromFile = readFileSync("./src/day.${day}.txt", {
    encoding: "utf-8",
}).split("\\n");

const partTwoStringsFile = readFileSync("./src/day.${day}.2.txt", {
    encoding: "utf-8",
}).split("\\n");


const main = async () => {
    const partOne = (strings = partOneStringsFromFile): number => {
        // Goodmorning handsome, your code goes here.
        strings;
        return 0;
    }

    const partTwo = (strings = partTwoStringsFile): number => {
        // Part one must've been easy.
        strings;
        return 0;
    }

    let start = Date.now();
    const partOneResults = partOne();
    let end = Date.now();
    const partOneDuration = end - start;

    start = Date.now();
    const partTwoResults = partTwo();
    end = Date.now();
    const partTwoDuration = end - start;

    console.table({
        partOne: partOneResults,
        partOneDuration,
        partTwo: partTwoResults,
        partTwoDuration,
    });
}

main();
`;

// * Create the raw text files that will be used for input.
const dayStringsFile = `// Path: day.${day}.txt

`;

const dayTwoStringsFile = `// Path: day.${day}.2.txt

`;

// * Write the files to disk.
writeFileSync(`./src/day.${day}.ts`, dayFile);
writeFileSync(`./src/day.${day}.txt`, dayStringsFile);
writeFileSync(`./src/day.${day}.2.txt`, dayTwoStringsFile);

console.log(`Created new files for day ${day}. Good luck!`);
