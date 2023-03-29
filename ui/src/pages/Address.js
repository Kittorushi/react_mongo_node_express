

import React, { useState, useEffect } from 'react';

const Address = () => {


  const [ownerAddress, setOwnerAddress] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/get_owner')
      .then(response => response.json())
      .then(data => {
        setOwnerAddress(data)
        console.log(data)
      })
      .catch(error => console.error(error));
  }, []);




  return (
    <div className="user">
      <h1 style={{ paddingTop: '25px', textAlign: "center" }}> Blockchain Explorer React Project</h1 >
      <div style={{ paddingTop: '30px', textAlign: "center", color: '#6E7783' }} > <h2>
        Home address
      </h2>     </div>
      <div style={{ textAlign: "center", color: '#6E7783' }} >

        <h4>
          {/* Converting Object into string */}

          <ul>
            {ownerAddress.map(wallet => (
              <li key={wallet.owner_account}>
                {wallet.owner_account}
              </li>
            ))}
          </ul>

        </h4>
        <div>
          <iframe src="https://giphy.com/embed/bTrTnPMPq8UORCrBWG" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bTrTnPMPq8UORCrBWG"></a></p>
        </div>
      </div>


    </div>

  );
};

export default Address;
