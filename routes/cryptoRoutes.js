const express = require("express");
const Cryptocurrency = require("../models/Cryptocurrency");
const router = express.Router();


//stats route for /api/stats?coin="any of the three" 
router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ error: "Query parameter 'coin' is required." });
  }

  try {
    const crypto = await Cryptocurrency.findOne({ coinId: coin })
      .sort({ lastUpdated: -1 }) // Sorting by the latest record
      .exec();

    if (!crypto) {
      return res.status(404).json({ error: `No data found for ${coin}.` });
    }

    res.json({
      price: crypto.priceUsd,
      marketCap: crypto.marketCapUsd,
      "24hChange": crypto.change24h,
    });
  } catch (error) {
    console.error("Error in /stats:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance =
      prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
      prices.length;
    return Math.sqrt(variance);
  };
  router.get("/deviation", async (req, res) => {
    try {
      const { coin } = req.query;
  
      if (!coin) {
        return res.status(400).json({ error: "Coin query parameter is required." });
      }
  
      const records = await Cryptocurrency.find({ coinId: coin })
        .sort({ lastUpdated: -1 }) 
        .limit(100);
  
      if (records.length === 0) {
        return res.status(404).json({ error: "No records found for the requested coin." });
      }
  
      const prices = records.map((record) => record.priceUsd);

      const deviation = calculateStandardDeviation(prices);
  
      res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
      console.error("Error calculating deviation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
module.exports = router; 