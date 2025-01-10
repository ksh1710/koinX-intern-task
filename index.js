const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const startScheduler = require("./scheduler/scheduler");
const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchAndSaveCryptoData = require("./services/fetchCryptoData"); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// mongoose.connect(process.env.MONGO_LOCAL_DOCKER_IMAGE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.MONGO_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () =>{
     console.log("Connected to MongoDB");

     await fetchAndSaveCryptoData(); // initial seeding of data in db


     startScheduler();
    })

    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
