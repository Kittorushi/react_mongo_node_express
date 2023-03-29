import React, { useEffect, useState, Component } from 'react';
import CurrentRecipt from './CurrentRecipt';

import Select from 'react-select'




const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  var [ownerBalance, setOwnerBalance] = useState(0)

  const [selectedOption, setSelectedOption] = useState(null); // initialize state to null
  const [destinationAccount, setDestinationAccount] = useState('initial-value');
  const inputAmount = document.getElementById('amount_check');
  const [receipts, setReceipts] = useState([]);
  var sourceAccount = 'Account A';
  const transactionhash = "fdc3c31435f7f2f557bfd82";
  const blockhash = "Rgsj1AKVnpJYhHz4rN";


  const [walletData, setWalletData] = useState([]);
  // const [ownerWallet, setOwnerWallet] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/json')
      .then(response => response.json())
      .then(data => setWalletData(data))
      .catch(error => console.error(error));
  }, []);

  const [ownerAddress, setOwnerAddress] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/get_owner')
      .then(response => response.json())
      .then(data => {
        setOwnerAddress(data)
        setOwnerBalance(data[0].amount)
        console.log(data)
      })
      .catch(error => console.error(error));
  }, []);





  const options = walletData.map(wallet => ({
    value: wallet.walletaddress,
    label: wallet.walletaddress
  }));

  // function to handle adding a new receipt
  const addReceipt = (sourceAccount, destinationAccount, amount) => {
    const newReceipt = {
      sourceAccount: sourceAccount,
      destinationAccount: destinationAccount,
      amount: amount
    };
    setReceipts([...receipts, newReceipt]);
  }


  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior
    if (selectedOption === null || inputAmount.value === null || inputAmount.value === 0 || inputAmount.value === "" || inputAmount.value === "0") {
      if (selectedOption != null) {
        alert('Please enter how much ETH you want to send.')
      } else {
        alert('Please select wallet address to send ETH.')
      }

    } else {
      if (ownerBalance < inputAmount.value) {
        alert('balnce is low please add token')
      } else {
        askUser()
      }

    }

  }

  function askUser() {
    const confirmation = window.prompt('Are you sure you want to continue? (y/n)');
    if (confirmation === 'y') {
      // Perform action

      console.log(selectedOption.value);
      console.log(inputAmount.value);
      console.log(sourceAccount);
      // console.log(OwnerCurrentBalance); need to get value owner balance
      fetch('http://localhost:4000/make_transcation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          destination_account: selectedOption.value,
          source_account: sourceAccount,
          tnx_hash: 'csdcsd',
          block_hash: 'csdcsdcsd',
          block_num: 23,
          gas_used: 5334,
          amount: inputAmount.value
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setOwnerBalance(ownerBalance - inputAmount.value);
          setDestinationAccount(selectedOption.value)
          addReceipt(sourceAccount, selectedOption.value, inputAmount.value);
          console.log(receipts)
          setShowReceipt(true);
          return response.json();

        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    } else {
      // Do nothing or handle cancellation
    }
  }


  // handle select option change
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption); // update state when an option is selected

  }



  return (

    <div className='transaction'>
      <h1>Transfer</h1>
      <form onSubmit={handleSubmit}  >
        <fieldset>
          <div className="App">

          </div>

          <label>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div >
                <p><b> Wallet Owner :    </b></p>
              </div>
              <div style={{ paddingLeft: '20px' }}>
                <p><b>

                  {ownerAddress.map(wallet => (
                    <div key={wallet.owner_account}>
                      {sourceAccount = wallet.owner_account}
                    </div>
                  ))}

                </b></p>
              </div>

            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div  >
                <p><b>  Owner Balance : </b></p>
              </div>

              <div id='ownerBalance' style={{ paddingLeft: '20px' }} >
                <p><b>
                  {ownerBalance}
                </b></p>
              </div>



            </div>


            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div >
                <p><b> Reciver Address    </b></p>
              </div>
              <div style={{ paddingLeft: '20px' }}>
                <Select options={options}
                  onChange={handleSelectChange}
                  value={selectedOption}
                  placeholder="Select wallet address to sent ETH"
                />
              </div>

            </div>
          </label>
          <label>



            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div >
                <p><b> Amount in Ether </b></p>
              </div>
              <div style={{ paddingLeft: '20px' }}>
                <input id='amount_check' name="Amount" type="number" style={{ height: '35px' }} />
              </div>
            </div>

          </label>

        </fieldset>

        <button type="submit" className="button">Submit</button>


      </form>

      <div>
        {showReceipt && <CurrentRecipt receipts={receipts} sourceAccount={sourceAccount} destinationAccount={destinationAccount} amount={amount} transactionhash={transactionhash} blockhash={blockhash} />}
      </div>

    </div >

  );
};

export default Transaction;



