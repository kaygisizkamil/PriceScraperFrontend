// RamOptions component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URI = 'https://dpg-cjfvl8k1ja0c73e36sr0-a.oregon-postgres.render.com';
const RamOptions = ({ selectedBrand, selectedRams, onSelectRam }) => {
  const [ramOptions, setRamOptions] = useState([]);

  useEffect(() => {
    if (selectedBrand) {
      fetchRamOptions(selectedBrand);
    }
  }, [selectedBrand]);

  useEffect(() => {
    // Reset checkbox selections when brand changes
    setRamOptions([]);
  }, [selectedBrand]);

  const fetchRamOptions = async (brand) => {
    try {
      const response = await axios.get(`${API_URI}/api/aggregated/ram-options/getall?brand=${brand}`);
      setRamOptions(response.data.ramOptions);
    } catch (error) {
      console.error('Error fetching RAM options:', error);
    }
  };

  const handleRamSelect = (ram) => {
    onSelectRam(ram);
  };

  return (
    <div className="border p-2 mt-3" style={{ position: 'sticky', maxWidth: '220px' }}>
      <div className="fixed-title bg-dark text-white px-2 py-1">Ram</div>
      <div className="list-group mt-2" style={{ height: '100px', maxHeight: '200px', overflowY: 'scroll' }}>
        {ramOptions.map((ram) => (
          <label key={ram} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              value={ram}
              onChange={() => handleRamSelect(ram)}
              className="form-check-input me-2"
              checked={selectedRams.includes(ram)} // Set the checked state based on selectedRams
            />
            <span className="text-sm">{ram}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RamOptions;
