import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  &:hover {
    box-shadow: 0 0 10px #ddd; 
  }
`;

const Image = styled.img`
  height: 150px; /* Adjust the height as needed */
  object-fit: contain;
`;


const ProductCard = styled.div`
  margin-bottom: 20px; /* Add spacing between cards */
`;


const CheapestProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    const fetchProducts = useCallback(async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/aggregated/cheapest/getall?page=${currentPage}`);
        const productsData = response.data;
        console.log("Product data is fetched");
        console.log(`from http://localhost:5000/api/aggregated/cheapest/getall?page=${currentPage}`);
        console.log(productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, [currentPage]);
  
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);
  
    const handlePageChange = (page) => {
      console.log("Clicked on page:", page);
      setCurrentPage(page);
    };
  
    return (
      <div className="container mt-5">
        <div className="row">
          {products.map(product => (
            <div className="col-md-3" key={product.id}>
              <ProductCard>
                <Card className="card h-100 product-card">
                  <div className="card-footer">
                    <Image src={product.image_link} alt={product.name} className="card-img-top"/>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
      
                    <p className="card-text product-details"style={{ fontSize: '0.8rem' }}>
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
                      <span className="text-muted">Puan(5 üzerinden): {product.review_rating}</span>
                    </p>
                  </div>
                  <div className="card-footer">
                    <a href={product.product_link} className="btn btn-primary btn-sm">View</a>
                  </div>
                </Card>
              </ProductCard>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-3">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: 10 }, (_, index) => index + 1).map(pageNumber => (
                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  };
  
  export default CheapestProducts;