const chalk = require("chalk");
const math = require("./math");

const a = 5;
const b = 3;

console.log(chalk.blue("Dodawanie:") + " " + chalk.green(math.add(a, b)));
console.log(chalk.blue("Odejmowanie:") + " " + chalk.green(math.subtract(a, b)));
console.log(chalk.blue("Mnożenie:") + " " + chalk.green(math.multiply(a, b)));