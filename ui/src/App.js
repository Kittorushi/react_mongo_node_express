import React, { useReducer, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Address from './pages/Address';
import Receipt from './pages/Receipt';
import Transaction from './pages/Transaction';
import Wallet from './pages/Wallet';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }


function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
  }
  
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }


  return(


    <div className="wrapper">

    
<Router>
    <Navbar />
        <Routes>
      
          <Route path='/' element={<Address/>} />
          <Route path='Transaction' element={<Transaction/>} />
          <Route path='Receipt' element={<Receipt/>} />
          <Route path='Wallet' element={<Wallet/>} />
          


        </Routes>
    </Router>

     

      {submitting &&
       <div>
        <h1>Receipt</h1>
        <fieldset>
         <label>
           <p><b> Transaction Hash:</b> 0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c</p>
           <p><b> Block Hash:</b> 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f</p>
           <p><b> Block number:</b> 43</p>
           <p><b> From:</b> 0xb794f5ea0ba39494ce839613fffba74279579268</p>
           <p><b> To:</b> 0x343c43a37d37dff08ae8c4a11544c718abb4fcf8</p>
           <p><b> Gas Used:</b> 5689 </p>
         </label> 
         
           {Object.entries(formData).map(([name, value]) => (
             <p key={name}><strong>{name}</strong>: {value.toString()}</p>
           ))}
         
       </fieldset>
         
       </div>
      } 
    </div>
  )
}

export default App;