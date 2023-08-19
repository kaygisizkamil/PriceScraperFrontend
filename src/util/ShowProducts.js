import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
const API_URI = 'postgres://admin:80s7caMIowdQutwg7MxwBmaRnIPJ86ri@dpg-cjfvl8k1ja0c73e36sr0-a.oregon-postgres.render.com/final_project_f04r';
const CheapestProducts = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSortOption, setSelectedSortOption] = useState('ascendive_price');
  const [hasMoreProducts, setHasMoreProducts] = useState(true); // Add this state


  const itemsPerPage = 20;

  
  const fetchProducts = useCallback(async () => {
    try {
      let response;

      if (searchQuery) { // If there's a search query, fetch matched data
        response = await axios.get(`${API_URI}/api/aggregated/matched/getall?page=${currentPage}&sort=${selectedSortOption}&query=${searchQuery}`);
      } else { // Otherwise, fetch cheapest data
        response = await axios.get(`${API_URI}/api/aggregated/cheapest/getall?page=${currentPage}&sort=${selectedSortOption}`);
      }

      const productsData = response.data;
      setProducts(productsData);
      setHasMoreProducts(productsData.length >= itemsPerPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [currentPage, selectedSortOption, searchQuery]); // Include searchQuery as a dependency

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts],searchQuery);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const isLastPage = products.length < itemsPerPage;

  return (
    <div className="container mt-5">
       <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="sortDropdown" className="mr-2">Sort By:</label>
          <select
                    style={{ marginTop: '20px' }} 

            id="sortDropdown"
            value={selectedSortOption}
            onChange={(e) => {
              setSelectedSortOption(e.target.value);
              setCurrentPage(1); // Reset currentPage when changing sorting
            }}

          >
            <option value="ascendive_price">Artan Fiyat </option>
            <option value="descending_price">Azalan Fiyat </option>
            <option value="ascendive_review_count">Artan degerlendirme puani</option>
            <option value="descendive_review_count">Azalan degerlendirme puani</option>
            <option value="ascendive_review_rating">Artan Degierlendirme Sayisi</option>
            <option value="descendive_review_rating">Azalan Degerlendirme Sayisi</option>
          </select>
        </div>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-3" key={index}>
            <ProductCard>
              <Card className="card h-100 product-card">
                <div className="card-footer">
                  <Image src={product.image_link} alt={product.name} className="card-img-top"/>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text product-details" style={{ fontSize: '0.8rem' }}>
                    <span className="text-muted">Ürün:</span> {product.product_name} <br/>
                    <span className="text-muted">Marka:</span> {product.brand_name} TL <br/>
                    <span className="text-muted">Fiyat:</span> {product.price} TL <br/>
                    <span className="text-muted">Kaynak:</span> {product.fromWhere} <br/>
                    <span className="text-muted">İşlemci:</span> {product.cpu} <br/>
                    <span className="text-muted">Ram:</span> {product.ram} <br/>
                    <span className="text-muted">Ekran Boyutu:</span> {product.screen} <br/>
                    <span className="text-muted">İşletim Sistemi:</span> {product.os} <br/>
                    <span className="text-muted">SSD:</span> {product.ssd} <br/>
                    <span className="text-muted">HDD:</span> {product.hdd} <br/>
                    <span className="text-muted">Güncellenme Tarihi:</span> {product.saved_time} <br/>
                    <span className="text-muted">Puan(5 üzerinden): {product.review_count}</span><br/>
                    <span className="text-muted">Puan veren kişi sayısı : {product.review_rating}</span>
                  </p>
                </div>
                <div className="card-footer">
                <a href={product.product_link} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View</a>
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

export default CheapestProducts;
