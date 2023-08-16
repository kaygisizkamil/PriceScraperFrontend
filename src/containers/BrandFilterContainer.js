import React, { useState, useEffect } from 'react';
import BrandFilter from '../components/BrandFilter';

import ProcessorOptions from '../components/ProcessorOptions'; // Import the ProcessorOptions component
import RamOptions from '../components/RamOptions';
import ScreenSizeOptions from '../components/ScreenSizeOptions';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import CheapestProducts from '../util/CheapestProducts';
import PriceIntervalOptions from '../components/PriceIntervalOptions';
import SelectedValuesResults from '../components/SelectedValuesResults';
import { useNavigate } from 'react-router-dom';


const BrandFilterContainer = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);
  const [selectedScreenSizes, setSelectedScreenSizes] = useState([]);
  const [selectedPriceInterval, setSelectedPriceInterval] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSelectedValues, setShowSelectedValues] = useState(false); // State for button click
 // const navigate = useNavigate(); // Initialize the navigate function


  useEffect(() => {
    // Reset selected values when brand changes but now we dont really need that
    setSelectedProcessors([]);
    setSelectedRams([]);
    setSelectedScreenSizes([]);
    setSelectedPriceInterval([]);
  }, [selectedBrands]);

  const handleSearchSubmit = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    setShowSelectedValues(false); // Reset the flag to show selected values

    // Reset the selected values on the left side
    setSelectedBrands([]);
    setSelectedProcessors([]);
    setSelectedRams([]);
    setSelectedScreenSizes([]);
    setSelectedPriceInterval([]); // Reset the flag to show selected values
  };

 /* 'Selected Brands': selectedBrands,
      'Selected Processors': selectedProcessors,
      'Selected Rams': selectedRams,
      'Selected Screen Sizes': selectedScreenSizes,*/
  const handleBrandSelect = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([brand]);
    }
  };

  const handleProcessorSelect = (processor) => {
    if (selectedProcessors.includes(processor)) {
      setSelectedProcessors(selectedProcessors.filter((p) => p !== processor));
    } else {
      setSelectedProcessors([...selectedProcessors, processor]);
    }
  };

  const handleRamSelect = (ram) => {
    if (selectedRams.includes(ram)) {
      setSelectedRams(selectedRams.filter((r) => r !== ram));
    } else {
      setSelectedRams([...selectedRams, ram]);
    }
  };

  const handleScreenSizeSelect = (screenSize) => {
    if (selectedScreenSizes.includes(screenSize)) {
      setSelectedScreenSizes(selectedScreenSizes.filter((s) => s !== screenSize));
    } else {
      setSelectedScreenSizes([...selectedScreenSizes, screenSize]);
    }
  };

  const handlePriceIntervalSelect = (minPrice, maxPrice) => {
    setSelectedPriceInterval([minPrice, maxPrice]);
  };

  const handleShowSelectedValues = () => {
    setShowSelectedValues(true);
  };

  return (
    <div className="container-fluid">
       <Navbar
        selectedBrands={selectedBrands}
        selectedRams={selectedRams}
        onSearchSubmit={handleSearchSubmit}
        setSearchQuery={setSearchQuery}
    />
      <div className="row">
        <div className="col-md-2 sidenav" style={{ marginTop: '40px' }}>
          <div className="border rounded-lg p-2 mt-3" style={{ maxWidth: '200px', height: 'calc(100vh - 100px)', overflowY: 'auto', position: 'fixed' }}>
            <BrandFilter brands={selectedBrands} onSelectBrand={handleBrandSelect} />
            {selectedBrands.length > 0 && (
              <ProcessorOptions selectedBrand={selectedBrands[0]} selectedProcessors={selectedProcessors} onSelectProcessor={handleProcessorSelect} />
            )}
            {selectedBrands.length > 0 && (
              <RamOptions selectedBrand={selectedBrands[0]} selectedRams={selectedRams} onSelectRam={handleRamSelect} />
            )}
            {selectedBrands.length > 0 && (
              <ScreenSizeOptions selectedBrand={selectedBrands[0]} selectedScreenSizes={selectedScreenSizes} onSelectScreenSize={handleScreenSizeSelect} />
            )}
            {selectedBrands.length > 0 && (
              <PriceIntervalOptions selectedBrand={selectedBrands[0]}  onSelectPriceInterval={handlePriceIntervalSelect} />
            )}
            <button onClick={handleShowSelectedValues}>Show Selected Values</button>
          </div>
        </div>
        <div className="col-md-10">
          <div className="container">
            {showSelectedValues ? (
              <SelectedValuesResults
                selectedValues={{
                  brands: selectedBrands,
                  processors: selectedProcessors,
                  rams: selectedRams,
                  screenSizes: selectedScreenSizes,
                  priceInterval: selectedPriceInterval,
                }}
              />
            ) : (
              <CheapestProducts searchQuery={searchQuery} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
            };  


export default BrandFilterContainer;