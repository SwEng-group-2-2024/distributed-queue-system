const figlet = require("figlet");

function printStringToAsciiArt(str) {
  figlet(str, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

// Example usage:
printStringToAsciiArt("ENIOLA message");
printStringToAsciiArt("Diarmuid message");
printStringToAsciiArt("ernie message");
