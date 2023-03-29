

import React, { useState, useEffect } from 'react';

const Wallet = (props) => {
  // var wallets = data.wallets

  const [walletData, setWalletData] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/json')
      .then(response => response.json())
      .then(data => setWalletData(data))
      .catch(error => console.error(error));
  }, []);



  return (
    <div
      style={{
        
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'right',
        paddingTop: '25px',
        fontSize: '20px',
      }}
    >

 

      <table>
        <thead>
          <tr>
            <th className='td' style={{ textAlign:'center', padding: '15px', }}>Wallet Address</th>
            <th className='td' style={{ textAlign:'center', padding: '15px', }}>Wallet Balance</th>
          </tr>
        </thead>

        <tbody >
         {
             Array.isArray(walletData) && walletData.map((wallet) => (
              <tr  key={wallet.walletaddress}>
                <td className='td' style={{ textAlign:'center', padding: '10px', }}>{wallet.walletaddress}</td>
                <td className='td' style={{ textAlign:'center', padding: '10px', alignItems: 'center',  justifyContent: 'right', }} >{wallet.walletbalance} eth</td>
              </tr>
            ))
            }
         
        </tbody>
      </table>




    </div>
  );
};

export default Wallet;