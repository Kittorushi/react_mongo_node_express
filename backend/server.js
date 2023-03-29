const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const utils = require('./utils/random_string_gen')
const walletDetails = require('./models/wallets.js')
const owner_walletDetails = require('./models/ownerschema.js')
const transctions = require('./models/transcations.js')
const allWallets = require('./config/walletarray.json')
const ownerWalletI = require('./config/owner_wallet.json')



const app = express();


const query = require('./controller/queryOne.js')
const { callback } = require("./utils/random_string_gen.js")



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});



// Generating the  mongo connection string
const connection = require("./config/connection.json");
const transcations = require('./models/transcations');
const dbUrl = utils.connectionString(connection)


mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // find all documents in the Wallets collection
        // return walletTest.find({});

    })
    .catch((err) => {
        console.log(`Error connecting to MongoDB: ${err}`);
    });


app.get("/json", async (req, res) => {
    fetchAccount(req, res)
});

app.get("/transcation_details", async (req, res) => {
    allTransation(req, res)
});


app.get("/get_owner", async (req, res) => {


    try {
        const wallets = await owner_walletDetails.find();
        // res.json(wallets.map(wallet => wallet.walletaddress));
        const walletData = wallets.map(wallet => {
            return { owner_account: wallet.owner_account, amount: wallet.amount }
        });
        res.json(walletData)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/make_transcation", async (req, res) => {
    try {

        // Create a new user document
        //    destination_account: "32323", unique
        //     block_num: 2, unique
        const trnx = new transcations({
            destination_account: req.body.destination_account,
            source_account: req.body.source_account,
            tnx_hash: req.body.tnx_hash,
            block_hash: req.body.block_hash,
            block_num: req.body.block_num,
            gas_used: req.body.gas_used,
            amount: req.body.amount
        });




        trnx.save()
            .then(() => {
                console.log('Transaction saved to database');
                res.json("Transaction saved to database");
                updateOwnerWallet(req.body.source_account, req.body.amount);
                updateDestinationWallet(req.body.destination_account, req.body.amount);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Internal server error" });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


async function updateOwnerWallet(source_account, amount) {
    try {
        const ownerWallet = await owner_walletDetails.findOne({ owner_account: source_account });
        if (!ownerWallet) {
            throw new Error(`Owner wallet with account ${source_account} not found`);
        }

        const newBalance = ownerWallet.amount - amount;
        if (newBalance < 0) {
            throw new Error(`Insufficient balance in owner wallet with account ${source_account}`);
        }

        ownerWallet.amount = newBalance;
        await ownerWallet.save();

        console.log('Owner wallet balance updated');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function updateDestinationWallet(destination_account, amount) {
    try {
        const depositWallet = await walletDetails.findOne({ walletaddress: destination_account });
        if (!depositWallet) {
            throw new Error(`Owner wallet with account ${destination_account} not found`);
        }

        console.log(typeof (depositWallet.walletbalance));
        console.log(typeof (parseInt(amount)));

        const newBalance = depositWallet.walletbalance + parseInt(amount);
        if (newBalance < 0) {
            throw new Error(`Insufficient balance in owner wallet with account ${destination_account}`);
        }

        depositWallet.walletbalance = newBalance;
        await depositWallet.save();

        console.log('Owner wallet balance updated');
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function fetchAccount(req, res) {
    try {
        const wallets = await walletDetails.find();
        // res.json(wallets.map(wallet => wallet.walletaddress));
        const walletData = wallets.map(wallet => {
            return { walletaddress: wallet.walletaddress, walletbalance: wallet.walletbalance }
        });
        res.json(walletData)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Function to create account
async function createAcoount() {
    try {
        // Finding all documents in the walletDetails collection
        walletDetails.find({}).then((data) => {
            // Checking if there is no data in the collection
            if (data.length === 0) {
                console.log("No data in collection");
                // If there is no data, inserting allWallets into the walletDetails collection
                walletDetails.insertMany(allWallets).then((result) => {
                    console.log('Connected to MongoDB');
                    console.log(`${result.insertedCount} documents inserted`);

                })
                    .catch((err) => {
                        console.log(`Error connecting to MongoDB: ${err}`);
                    })
            }
            // If there is data in the collection
            else {
                console.log("Data found in collection");
            }
        })
            .catch((err) => {
                console.log(`Error something went wrong in MongoDB: ${err}`);
            })


        owner_walletDetails.find({}).then((data) => {
            if (data.length === 0) {
                console.log("No data in collection");
                // If there is no data, inserting allWallets into the walletDetails collection
                owner_walletDetails.insertMany(ownerWalletI).then((result) => {
                    console.log('Connected to MongoDB');
                    console.log(`${result.insertedCount} Owner created`);

                })
                    .catch((err) => {
                        console.log(`Error connecting to MongoDB: ${err}`);
                    })
            }
            // If there is data in the collection
            else {
                console.log("Data found in Owner");
            }
        }).catch((err) => {

        })


    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Internal server error" });
    }
}


async function allTransation(req, res) {

    try {
        const tnx = await transctions.find();
        // res.json(wallets.map(wallet => wallet.walletaddress));
        const allTnx = tnx.map(allTnxData => {
            return {
                block_num: allTnxData.block_num,
                source_account: allTnxData.source_account,
                destination_account: allTnxData.destination_account,
                tnx_hash: allTnxData.tnx_hash,
                block_hash: allTnxData.block_hash,
                gas_used: allTnxData.gas_used,
                amount: allTnxData.amount
            }
        });
        res.json(allTnx)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}



//Call to account creation
createAcoount()





// //access json data from json file
// var wallets = data.wallets;
// var ownerAddress = data.owneraddress
// var ownerBalance = data.ownerbalance;

// // // Define your routes and middleware here
// // app.listen(4000, () => {
// //     console.log('Server started on port 4000');
// // });



// app.get('/json', function (req, res) {
//     res.json(wallets)
// })


// app.get('/get_owner', function (req, res) {
//     res.json(ownerAddress)
// })

