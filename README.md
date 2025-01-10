# Crypto Stats API

This project provides APIs to fetch cryptocurrency data (Bitcoin, Matic, and Ethereum) and calculate the standard deviation of their prices. The data is fetched from the CoinGecko API and stored in MongoDB.

## Features
- **Task 1**: Fetches and stores cryptocurrency data every 2 hours (price, market cap, and 24h change) for Bitcoin, Matic, and Ethereum.
- **Task 2**: Provides an API `/stats` that returns the latest data for a requested cryptocurrency.
- **Task 3**: Provides an API `/deviation` that calculates and returns the standard deviation of the price of a cryptocurrency based on the last 100 records.

## Technologies Used
- Node.js
- Express
- MongoDB (using MongoDB Atlas)
- Docker
- Azure Container Registry (ACR)

---

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB Atlas account (for database)
- Docker (if running with Docker)
- Azure account (if using Azure ACR)

### 1. Clone the Repository

git clone https://github.com/username/repository-name.git
cd repository-name

###  2. Install Dependencies

npm install

### 3. Running the Project Locally

node index.js

### 4. Accessing the APIs
```
/stats API:

Query Params: coin=<bitcoin|matic|ethereum>

# Sample Request:
GET http://localhost:3000/stats?coin=bitcoin

# sample Response:
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}

/deviation API:

Query Params: coin=<bitcoin|matic|ethereum>


Sample Request:
GET http://localhost:3000/deviation?coin=bitcoin

Sample Response:
{
  "deviation": 4082.48
}
```
### 5. Running the Project with Docker
```
#5.1. Build the Docker Image

docker build -t crypto-stats-api .


#5.2. Run the Docker Container

docker run -d -p 3000:3000 --env-file .env crypto-stats-api


This will run the project inside a Docker container, and you can access it via http://localhost:3000.
```

### PRODUCTION
```
This project is live on production on my azure VM, i have pushed my local Docker image
 to Azure Container Registry and pulled it from there on my azure VM and hosted it using docker.

The public API is available as:

curl "http://172.210.80.153:3000/api/deviation?coin=bitcoin

curl "http://172.210.80.153:3000/api/stats?coin=bitcoin


