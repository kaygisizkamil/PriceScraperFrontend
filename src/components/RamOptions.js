import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URI = 'http://localhost:5000';


const RamOptions = ({ selectedBrand, onSelectRam }) => {
    const [ramOptions, setRamOptions] = useState([]);
  
    useEffect(() => {
      if (selectedBrand) {
        fetchRamOptions(selectedBrand);
      }
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
              />
              <span className="text-sm">{ram}</span>
            </label>
          ))}
        </div>
      </div>
    );
          };
export default RamOptions;