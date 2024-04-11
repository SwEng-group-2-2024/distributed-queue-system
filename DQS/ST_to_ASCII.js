const figlet = require("figlet");

function ST_to_ASCII(str) {
  figlet(str, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

module.exports = ST_to_ASCII;
