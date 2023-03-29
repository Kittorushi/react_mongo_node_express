// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const mongoString = process.env.DATABASE_URL;

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on('error', (error) => {
//   console.log(error)
// })

// database.once('connected', () => {
//   console.log('Database Connected');
// })
// const app = express();

// app.use(express.json());

// app.listen(3000, () => {
//   console.log(`Server Started at ${3000}`)
// })

// // ---------------------------------------

// // async function main() {

// //   // // Inserting the user in the db
// //   // query.insert(user.email, user.password, user.firstName, user.lastName, user.org, callback)

// //   // // Retrieving the user
// //   // query.get(user.email, callback)

// //   // // getting the user in async manner
// //   // try {
// //   //   const res = await query.getAsync(user.email)
// //   //   console.log(res)
// //   // } catch (err) {
// //   //   console.log("err: ", err)
// //   // }



// //   // // Updating the user org
// //   // query.update(user.email, { "org": "George Brown College" }, callback)

// //   // // Deleting the user
// //   // query.delete(user.email, callback)

// // }

// // main()

// // ----------------------------------------

// // const express = require('express');
// // const app = express();
// // const data = require('../backend/data.json');


// // //access json data from json file
// // var wallets = data.wallets;
// // var ownerAddress = data.owneraddress
// // var ownerBalance = data.ownerbalance;

// // // Define your routes and middleware here
// // app.listen(4000, () => {
// //   console.log('Server started on port 4000');
// // });

// // // Allow all to get access
// // app.all("*", function (req, res, next) {
// //   res.setHeader('Access-Control-Allow-Origin', '*');
// //   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers', '*');
// //   next();
// // })


// // app.get('/json', function (req, res) {
// //   res.json(wallets)
// // })


// // app.get('/get_owner', function (req, res) {
// //   res.json(ownerAddress)
// // })

