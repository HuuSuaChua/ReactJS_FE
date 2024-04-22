import React, { useState } from 'react';

export default function Checkout() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation here before checking the price or proceeding
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Phone:", phone);
    // You can check the price or proceed to the next step here
  };

  return (
    <div>
      <h2>Check Out</h2>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="control-group">
          <label className="span2 control-label" htmlFor="name">Name</label>
          <div className="controls">
            <input 
              type="text" 
              id="name" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="control-group">
          <label className="span2 control-label" htmlFor="address">Address</label>
          <div className="controls">
            <input 
              type="text" 
              id="address" 
              placeholder="Address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="control-group">
          <label className="span2 control-label" htmlFor="phone">Phone</label>
          <div className="controls">
            <input 
              type="tel" 
              id="phone" 
              placeholder="Phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <button type="submit" className="shopBtn">Check Price</button>
          </div>
        </div>
      </form> 
    </div>
  );
}
