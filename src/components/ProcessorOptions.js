// ProcessorOptions component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//const API_URI = 'https://dpg-cjfvl8k1ja0c73e36sr0-a.oregon-postgres.render.com';

const API_URI='postgres://admin:80s7caMIowdQutwg7MxwBmaRnIPJ86ri@dpg-cjfvl8k1ja0c73e36sr0-a.oregon-postgres.render.com/final_project_f04r'
const ProcessorOptions = ({ selectedBrand, selectedProcessors, onSelectProcessor }) => {
  const [processorOptions, setProcessorOptions] = useState([]);

  useEffect(() => {
    if (selectedBrand) {
      fetchProcessorOptions(selectedBrand);
    }
  }, [selectedBrand]);

  useEffect(() => {
    // Reset checkbox selections when brand changes
    setProcessorOptions([]);
  }, [selectedBrand]);

  const fetchProcessorOptions = async (brand) => {
    try {
      const response = await axios.get(`${API_URI}/api/aggregated/processor-options/getall?brand=${brand}`);
      setProcessorOptions(response.data.processorOptions);
    } catch (error) {
      console.error('Error fetching processor options:', error);
    }
  };

  const handleProcessorSelect = (processor) => {
    onSelectProcessor(processor);
  };

  return (
    <div className="border p-2 mt-3" style={{ position: 'relative', maxWidth: '220px' }}>
      <div className="fixed-title bg-dark text-white px-2 py-1">İşlemci</div>
      <div className="list-group mt-2" style={{ height: '50px', maxHeight: '200px', overflowY: 'scroll' }}>
        {processorOptions.map((processor) => (
          <label key={processor} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              value={processor}
              onChange={() => handleProcessorSelect(processor)}
              className="form-check-input me-2"
              checked={selectedProcessors.includes(processor)} // Set the checked state based on selectedProcessors
            />
            <span className="text-sm">{processor}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProcessorOptions;
