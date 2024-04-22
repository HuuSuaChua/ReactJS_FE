import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoldPrice = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoldPrice();
  }, []);

  const fetchGoldPrice = async () => {
    try {
      const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
        headers: {
          'x-access-token': 'goldapi-5c38slvaac7k1-io'
        }
      });
      setGoldPrice(response.data.price);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error('Error fetching gold price:', error);
      setError('Could not fetch gold price. Please try again.'); // Set error message
    }
  };

  return (
    <div>
      <h2>Giá vàng</h2>
      {error && <p>{error}</p>}
      {goldPrice && <p>Giá vàng hiện tại: {goldPrice} USD</p>}
    </div>
  );
};

export default GoldPrice;
