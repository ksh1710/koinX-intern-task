const mongoose = require("mongoose");

const cryptocurrencySchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  priceUsd: { type: Number, required: true },
  marketCapUsd: { type: Number, required: true },
  change24h: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cryptocurrency", cryptocurrencySchema);
