import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const API_URI = 'https://dpg-cjfvl8k1ja0c73e36sr0-a.oregon-postgres.render.com';

const SelectedValuesResults = ({ selectedValues }) => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSortOption, setSelectedSortOption] = useState('ascendive_price');
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const itemsPerPage = 20;

  const Card = styled.div`
    border: 1px solid #ddd;
    &:hover {
      box-shadow: 0 0 10px #ddd;
    }
  `;

  const Image = styled.img`
    height: 150px;
    object-fit: contain;
  `;

  const ProductCard = styled.div`
    margin-bottom: 20px;
  `;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const queryString = new URLSearchParams({
          selectedValues: JSON.stringify(selectedValues),
          page: currentPage,
          itemsPerPage: itemsPerPage,
          sort: selectedSortOption,
        }).toString();

        const response = await axios.get(`${API_URI}/api/aggregated/sidebar/getall?${queryString}`);
        const data = response.data;
        setResults(data);
        setHasMoreProducts(data.length >= itemsPerPage);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [selectedValues, currentPage, selectedSortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
    useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 when selectedValues change
  }, [selectedValues]);

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
    setCurrentPage(1); // Reset currentPage when changing sorting
  };

  const isLastPage = results.length < itemsPerPage;


  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="sortDropdown" className="mr-2">Sort By:</label>
          <select
            style={{ marginTop: '20px' }}
            id="sortDropdown"
            value={selectedSortOption}
            onChange={handleSortChange} // Add this line
          >
            <option value="ascendive_price">Ascending Price</option>
            <option value="descending_price">Descending Price</option>
            <option value="ascendive_review_count">Ascending Review Score</option>
            <option value="descendive_review_count">Descending Review Score</option>
            <option value="ascendive_review_rating">Ascending Review Rating</option>
            <option value="descendive_review_rating">Descending Review Rating</option>
          </select>
        </div>
      </div>
      <div className="row">
        {results.map((result, index) => (
          <div className="col-md-3" key={index}>
            <ProductCard>
              <Card className="card h-100 product-card">
                <div className="card-footer">
                  <Image src={result.image_link} alt={result.name} className="card-img-top"/>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{result.name}</h5>
                  <p className="card-text product-details" style={{ fontSize: '0.8rem' }}>
                    <span className="text-muted">Ürün:</span> {result.product_name} <br/>
                    <span className="text-muted">Marka:</span> {result.brand_name}  <br/>
                    <span className="text-muted">Fiyat:</span> {result.price} TL <br/>
                    <span className="text-muted">Kaynak:</span> {result.fromWhere} <br/>
                    <span className="text-muted">İşlemci:</span> {result.cpu} <br/>
                    <span className="text-muted">Ram:</span> {result.ram} <br/>
                    <span className="text-muted">Ekran Boyutu:</span> {result.screen} <br/>
                    <span className="text-muted">İşletim Sistemi:</span> {result.os} <br/>
                    <span className="text-muted">SSD:</span> {result.ssd} <br/>
                    <span className="text-muted">HDD:</span> {result.hdd} <br/>
                    <span className="text-muted">Güncellenme Tarihi:</span> {result.saved_time} <br/>
                    <span className="text-muted">Puan(5 üzerinden): {result.review_rating}</span><br/>
                    <span className="text-muted">Puan veren kişi sayısı : {result.review_count}</span><br/>
                  </p>
                </div>
                <div className="card-footer">
                  <a href={result.product_link} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View</a>
                </div>
              </Card>
            </ProductCard>
          </div>
        ))}
      </div>
      <div className="row justify-content-center mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: currentPage }, (_, index) => index + 1).map((pageNumber) => (
              <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            ))}
            <li className={`page-item ${isLastPage || !hasMoreProducts ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isLastPage && <p>Bütün ürünler listelendi</p>}
    </div>
  );
};
export default SelectedValuesResults;
