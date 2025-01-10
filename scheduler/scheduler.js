const schedule = require("node-schedule");
const fetchAndStoreCryptoData = require("../services/fetchCryptoData");

const startScheduler = () => {
  schedule.scheduleJob("0 */2 * * *", async () => {
    console.log("Fetching and storing cryptocurrency data...");
    await fetchAndStoreCryptoData();
  });
};

module.exports = startScheduler;
