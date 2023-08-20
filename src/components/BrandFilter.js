
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URI = '`https://price-scraper-irdo.onrender.com';
const BrandFilter = ({ brands, onSelectBrand }) => {
  const [availableBrands, setAvailableBrands] = useState([]);
  
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URI}/api/aggregated/checkbox-options/getall`);
      setAvailableBrands(response.data.brands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleBrandClick = (brand) => {
    console.log(`Clicked on brand: ${brand}`);
    if (brands.includes(brand)) {
      // If the brand is already selected, deselect it
      onSelectBrand(null);
    } else {
      onSelectBrand(brand);
    }
  };

 
  return (
    <div className="border p-2 mt-3" style={{ position: 'relative', maxWidth: '200px' ,marginTop:'100px'}}>
      <div className="fixed-title bg-dark text-white px-2 py-1">Marka</div>
      <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        {availableBrands.map((brand) => (
          <label key={brand} className="list-group-item d-flex align-items-center">
            <input
              type="radio"
              value={brand}
              onChange={() => handleBrandClick(brand)}
              checked={brands.includes(brand)}
              className="form-check-input me-2"
            />
            <span className="text-sm">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};


export default BrandFilter;