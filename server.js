// Budget API
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
const database = 'mongodb_demo';

let json_data = require('./data.json');
let url = `mongodb://127.0.0.1:27017/${database}`;

const mongoose = require('mongoose');
const budgetModel = require('./models/budget_schema');


// open connection
function openConnection() {
  console.log('Opening connection');
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
};


// close connection
function closeConnection() {
  mongoose.connection.close(); console.log('Connection closed');
};


// serving static content
app.use('/', express.static('public'));

// Enable CORS on app
app.use(cors());

// Use JSON on app
app.use(express.json());


let testData = budgetModel({
  category: 'Category',
  amount: 0,
  color: '#000000'
});
// let testGlobalVar;
let all_data = [];


// serving static content
/*
app.get('/hello', (req, res) => {
  res.send('Hello world from Express.js server!');
});
/**/

/**/
app.get('/budget', (req, res) => {
  res.json(json_data);
});
/**/

/**/
app.get('/insert', (req, res) => {
  // console.log(openConnection());
  openConnection()
  .then(() => {
    console.log('Connected to database');

    budgetModel.insertMany(testData)
    .then((data) => {
      console.log('Insert successful');
      console.log(data);
      
      closeConnection();
    })
    .catch((modelError) => {
      console.log('Unable to perform insert');
      console.log(modelError);

      closeConnection();
    })
  })
  .catch((connectionError) => {
    console.log('Unable to connect to database');
    console.log(connectionError);
  });

  res.end();
});
/**/

/**/
app.post('/put', (req, res) => {
  // console.log(openConnection());
  openConnection()
  .then(() => {
    console.log('Connected to database');

    budgetModel.insertMany(req.body)
    .then((data) => {
      console.log('Put successful');
      console.log(data);
      
      closeConnection();
    })
    .catch((modelError) => {
      console.log('Unable to perform put');
      console.log(modelError);

      closeConnection();
    })
  })
  .catch((connectionError) => {
    console.log('Unable to connect to database');
    console.log(connectionError);
  });

  res.json(req.body);
  res.end();
});
/**/

/**/
app.get('/retrieve', (req, res) => {
  // console.log(openConnection());
  openConnection()
  .then(() => {
    console.log('Connected to database');

    budgetModel.find({}, 'category amount color -_id')
    .then((data) => {
      if (data.length > 0) {
      console.log('Find successful');

      let category_arr = [];
      let amount_arr = [];
      let color_arr = [];
      let chartjs_datasets_json = {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      };
      for (let i = 0; i < data.length; ++i) {
        category_arr.push(data[i].category);
        amount_arr.push(data[i].amount);
        color_arr.push(data[i].color);
      }
      
      // console.log(data);
      // console.log(category_arr, amount_arr, color_arr);

      chartjs_datasets_json.datasets[0].data = amount_arr;
      chartjs_datasets_json.datasets[0].backgroundColor = color_arr;
      chartjs_datasets_json.labels = category_arr;
      // console.log(chartjs_datasets_json);

      // console.log(testGlobalVar);
      // testGlobalVar = chartjs_datasets_json;
      // console.log(testGlobalVar);
      
      all_data.push(chartjs_datasets_json);
      all_data.push(category_arr);
      all_data.push(color_arr);
      all_data.push(amount_arr);

      // all_data.push(testGlobalVar);
      
      // console.log(all_data[1]);
      res.json(all_data);

      } else {
        console.log('Find unsuccessful\nEmpty...');
      }
      
      closeConnection();
    })
    .catch((modelError) => {
      console.log('Unable to perform find');
      console.log(modelError);

      closeConnection();
    })
  })
  .catch((connectionError) => {
    console.log('Unable to connect to database');
    console.log(connectionError);
  });
});
/**/

app.listen(port, () => {
  console.log(`Example API is listening on http://localhost:${port}`);
});

// app.get('/public')