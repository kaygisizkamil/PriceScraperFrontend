// ScreenSizeOptions component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URI = 'https://price-scraper-irdo.onrender.com';

const ScreenSizeOptions = ({ selectedBrand, selectedScreenSizes, onSelectScreenSize }) => {
  const [screenSizeOptions, setScreenSizeOptions] = useState([]);

  useEffect(() => {
    if (selectedBrand) {
      fetchScreenSizeOptions(selectedBrand);
    }
  }, [selectedBrand]);

  useEffect(() => {
    // Reset checkbox selections when brand changes
    setScreenSizeOptions([]);
  }, [selectedBrand]);

  const fetchScreenSizeOptions = async (brand) => {
    try {
      const response = await axios.get(`${API_URI}/api/aggregated/screen-size-options/getall?brand=${brand}`);
      setScreenSizeOptions(response.data.screenSizeOptions);
    } catch (error) {
      console.error('Error fetching screen size options:', error);
    }
  };

  const handleScreenSizeSelect = (size) => {
    onSelectScreenSize(size);
  };

  return (
    <div className="border p-2 mt-3" style={{ position: 'relative', maxWidth: '220px' }}>
      <div className="fixed-title bg-dark text-white px-2 py-1">Ekran Boyutu</div>
      <div className="list-group mt-2" style={{ height: '100px', maxHeight: '200px', overflowY: 'scroll' }}>
        {screenSizeOptions.map((size) => (
          <label key={size} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              value={size}
              onChange={() => handleScreenSizeSelect(size)}
              className="form-check-input me-2"
              checked={selectedScreenSizes.includes(size)} // Set the checked state based on selectedScreenSizes
            />
            <span className="text-sm">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ScreenSizeOptions;
