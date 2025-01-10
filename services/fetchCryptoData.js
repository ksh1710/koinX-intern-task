const axios = require("axios");
const Cryptocurrency = require("../models/Cryptocurrency");

const fetchAndSaveCryptoData = async () => {
  try {
    const coins = ["bitcoin", "matic-network", "ethereum"];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
      ","
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const response = await axios.get(url);
    const data = response.data;

    for (const coinId of coins) {
      const coinData = {
        coinId,
        priceUsd: data[coinId].usd,
        marketCapUsd: data[coinId].usd_market_cap,
        change24h: data[coinId].usd_24h_change,
        lastUpdated: new Date(),
      };

      await Cryptocurrency.create(coinData); //adding data instead of overwriting as pre task 3 
    }
    console.log("Data fetched and saved successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

module.exports = fetchAndSaveCryptoData;
