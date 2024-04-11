// Helper function to generate a unique Message ID using SHA-256 hashing
function generateUniqueMessageID(message, timestamp, sender) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(message + timestamp + sender);
  return hash.digest("hex");
}
module.exports = generateUniqueMessageID;
