# Fetch Points API

This project implements a simple points management system using Express.js. Users can add payer transactions, spend points, and check their current point balances. The system ensures points are spent in the order they were added, following the oldest-first principle.

## Features
- Add Transactions: Submit payer transactions (including payer name, points, and timestamp).
- Spend Points: Spend points across payers based on the order of the oldest transactions first.
- Check Balance: Retrieve the current point balance for each payer.

## Technologies
- Node.js
- Express.js

  
## Installation
Clone this repository:
```bash
git clone https://github.com/yourusername/fetch_points.git

cd fetch_points
```

Install the dependencies:
```bash
npm install express
```

### Running the Application

Start the server by running:
``` bash
node index.js
```

## Testing the API
You can test the API using tools like Postman or cURL with the provided endpoints.


### The API will be running at http://localhost:8000.



