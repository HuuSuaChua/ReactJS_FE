import React, { useState, useEffect } from 'react';
import axios from 'axios';

const USDPrice = () => {
  const [dollarPrice, setDollarPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDollarPrice();
  }, []);

  const fetchDollarPrice = async () => {
    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/8203cfe2cf4b836f6213ca24/latest/USD');
      const conversionRates = response.data.conversion_rates;
      setDollarPrice(conversionRates);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error('Error fetching dollar price:', error);
      setError('Could not fetch dollar price. Please try again.'); // Set error message
    }
  };

  return (
    <div className='container' style={{border:"1px solid black",background:'#ffffff',padding:"50px"}}>
      <h2>Thông tin giá đô la</h2>
      {error && <p>{error}</p>}
      {dollarPrice && (
        <div>
          <h3>Giá đô la hiện tại:</h3>
          <table>
            <thead>
              <tr>
                <th>Loại tiền</th>
                <th>Giá trị</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dollarPrice).map(([currency, rate]) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default USDPrice;
