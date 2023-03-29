import React from 'react';


const CurrentRecipt = (props) => {

    const { sourceAccount, destinationAccount, amount, transactionhash, blockhash } = props;
    console.log(props.receipts);

    return (
        <div className='receipt'>
            <h2><b>Transaction Receipt</b></h2>
            <p><b>Transaction Hash: </b>{transactionhash} 00000000839a8e6886</p>
            <p><b>Block Hash:</b> {blockhash} 19d6689c0850000000000 </p>
            <p><b>Block number:</b> 789</p>
            <p><b>Source Account:</b> {sourceAccount} 05cfd38f6ae6aa83674cc99e4d75a1458c165</p>
            <p><b>Destination Account:</b> {destinationAccount} 6886ab5951d76f411475428afc909475e049</p>
            <p><b>Gas Used:</b> 1100 </p>
            <p><b>Amount:</b> {amount}99</p>
        </div>
    );

};

export default CurrentRecipt;