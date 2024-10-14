import express from 'express';
const port = 8000

const app = express()

app.use(express.json())

//array to store transactions
let transactions = [] 

//object to store balances
let balances = {} 



app.post('/add', (req, res) => {
  const { payer, points, timestamp } = req.body

  //add to the transactions
  transactions.push({ payer, points, timestamp }) 

  //add to the points
  balances[payer] = (balances[payer] || 0) + points;  
  res.status(200).send();
})

app.post('/spend' , (req, res) => {
  let pointsToSpend = req.body.points

  //total points in the balances
  const totalPoints = Object.values(balances).reduce((a, b) => a + b, 0) 

  if (pointsToSpend > totalPoints) {
    return res.status(400).send('Sorry! Not enough points') 
  }

  //declaring an array for the final result
  let spend = []

  //sort with timestamps as parameters
  transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); 

  for (let i = 0; i < transactions.length && pointsToSpend > 0; i++) {
    let transaction = transactions[i];
    if (transaction.points === 0) continue;

    // getting how many points to take out for specefic payer
    let deduction = Math.min(pointsToSpend, transaction.points);
    pointsToSpend -= deduction;

    //update the balances object accordingly
    balances[transaction.payer] -= deduction;
    transaction.points -= deduction;

    spend.push({ payer: transaction.payer, points: -deduction });
  }

  //updating transactions
  transactions = transactions.filter(t => t.points !== 0);
  res.status(200).json(spend);
})


app.get('/balance', (req, res) => {
  //return the balances object
  res.status(200).json(balances);
});

app.listen(port, () => {
  console.log(`Api is running on the port ${port}`)
})
