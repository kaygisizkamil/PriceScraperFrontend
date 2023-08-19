import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URI = 'https://dpg-cjfvl8k1ja0c73e36sr0-a.oregon-postgres.render.com';
const PriceIntervalOptions = ({ selectedBrand, onSelectPriceInterval }) => {
  const [priceInterval, setPriceInterval] = useState({ minPrice: 0, maxPrice: 0 });
  const [selectedSliderValue, setSelectedSliderValue] = useState(0);

  useEffect(() => {
    if (selectedBrand) {
      fetchPriceInterval(selectedBrand);
    }
  }, [selectedBrand]);

  const fetchPriceInterval = async (brand) => {
    try {
      const response = await axios.get(`${API_URI}/api/aggregated/price-range/get?brand=${brand}`);
      setPriceInterval(response.data);
      setSelectedSliderValue(response.data.minPrice); // Set the selected value to the minimum value from the database
    } catch (error) {
      console.error('Error fetching price interval:', error);
    }
  };

  const handlePriceIntervalSelect = (maxPrice) => {
    setSelectedSliderValue(maxPrice);
    onSelectPriceInterval(priceInterval.minPrice, maxPrice);
  };

  return (
    <div className="border p-2 mt-3" style={{ position: 'relative', maxWidth: '220px' }}>
      <div className="fixed-title bg-dark text-white px-2 py-1">Price Interval</div>
      <div className="list-group mt-2">
        <input
          type="range"
          min={priceInterval.minPrice}
          max={priceInterval.maxPrice}
          value={selectedSliderValue}
          onChange={(e) => handlePriceIntervalSelect(parseInt(e.target.value))}
          className="form-range"
        />
        <span>Min Price: {priceInterval.minPrice}</span>
        <span>Max Price: {priceInterval.maxPrice}</span>
        <span>Selected Price: {selectedSliderValue}</span>
      </div>
    </div>
  );
};

export default PriceIntervalOptions;
