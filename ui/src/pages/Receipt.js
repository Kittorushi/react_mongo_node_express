import React, { useState, useEffect } from 'react';


const Receipt = () => {

  const [tnx, setTnx] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/transcation_details')
      .then(response => response.json())
      .then(data => {
        setTnx(data)
        // Transaction(data)

        console.log(data)
      })
      .catch(error => console.error(error));
  }, []);

  return (

    <div>

      {tnx.map((tnxId, index) => (
        <div className='receipt' key={index}>

          <p>Source Account: {tnxId.source_account}</p>
          <p>Destination Account: {tnxId.destination_account}</p>
          <p>Amount: {tnxId.amount}</p>
          <p>Transaction Hash: {tnxId.tnx_hash}</p>
          <p>Block Hash: {tnxId.block_hash}</p>
          <p>Block Number: {tnxId.block_num}</p>
          <p>Gas Used: {tnxId.gas_used}</p>


        </div>
      ))}


    </div>



  );

};

export default Receipt;