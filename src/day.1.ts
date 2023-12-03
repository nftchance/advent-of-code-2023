import { readFileSync } from "fs";

const partOneStringsFromFile = readFileSync("./src/day.1.txt", {
    encoding: "utf-8",
}).split("\n");

const partTwoStringsFile = readFileSync("./src/day.1.2.txt", {
    encoding: "utf-8",
}).split("\n");

const main = async () => {
    const start = Date.now();

    // You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you
    // ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the
    // sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a
    // trebuchet ("please hold still, we need to strap you in").
    //
    // As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been
    // amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are
    // having trouble reading the values on the document.
    //
    // The newly-improved calibration document consists of lines of text; each line originally contained a specific
    // calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining
    // the first digit and the last digit (in that order) to form a single two-digit number.
    //
    // For example:
    //      1abc2
    //      pqr3stu8vwx
    //      a1b2c3d4e5f
    //      treb7uchet
    //
    // In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
    //
    // Consider your entire calibration document. What is the sum of all of the calibration values?
    const partOne = (strings = partOneStringsFromFile): number => {
        const findDigit = (str: string[]): string | undefined => {
            return str.find((char) => Number.isInteger(parseInt(char)));
        };

        return strings.reduce((acc, curr) => {
            const string = curr.trim().split("");
            const firstDigit = findDigit(string);
            const lastDigit = findDigit(string.reverse());

            const parsedNumber = parseInt(`${firstDigit}${lastDigit}`);

            if (isNaN(parsedNumber)) return acc;

            return acc + parsedNumber;
        }, 0);
    };

    // Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters:
    // one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
    //
    // Equipped with this new information, you now need to find the real first and last digit on each line. For example:
    //
    //      two1nine
    //      eightwothree
    //      abcone2threexyz
    //      xtwone3four
    //      4nineeightseven2
    //      zoneight234
    //      7pqrstsixteen
    //
    // In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
    //
    // What is the sum of all of the calibration values?
    const partTwo = (strings = partTwoStringsFile): number => {
        return strings.reduce((acc, curr) => {
            const string = curr.trim();

            if (string.length === 0) return acc;

            const digits = [
                ["one", "1"],
                ["two", "2"],
                ["three", "3"],
                ["four", "4"],
                ["five", "5"],
                ["six", "6"],
                ["seven", "7"],
                ["eight", "8"],
                ["nine", "9"],
            ]
                .reduce((acc, curr) => {
                    const [word, number] = curr;

                    return acc.replace(
                        new RegExp(word, "g"),
                        `${word}${number}${word}`
                    );
                }, string)
                .split("")
                .filter((char) => {
                    return Number.isInteger(parseInt(char));
                });

            const firstDigit = parseInt(digits[0]);
            const lastDigit = parseInt(digits[digits.length - 1]);
            const parsedNumber = parseInt(`${firstDigit}${lastDigit}`);

            if (isNaN(parsedNumber)) return acc;

            return acc + parsedNumber;
        }, 0);
    };

    console.table({
        partOne: partOne(),
        partTwo: partTwo(),
    });

    const end = Date.now();
    const duration = end - start;

    console.log(`Duration: ${duration}ms`);
};

main();
