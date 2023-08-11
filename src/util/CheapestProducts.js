import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const CheapestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/aggregated/cheapest/getall?page=1');
      const productsData = response.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
const Card = styled.div`
border: 1px solid #ddd;
&:hover {
  box-shadow: 0 0 10px #ddd; 
}
`;

const Image = styled.img`
height: 200px;
object-fit: contain;
`;

const Details = styled.p`
font-size: 0.9rem;
`;

return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <Card className="card h-100 product-card">
              <div className="card-footer">
                <Image src={product.image_link} alt={product.name} className="card-img-top"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
  
                <Details className="card-text product-details">
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
                  <span className="text-muted">Puan:</span>
                  <span className="star-rating">
                    {[...Array(5)].map((_, index) => (
                        <i
                        key={index}
                        className={Math.floor(product.review_rating) + 1 <= index + 1 ? "fas fa-star" : "far fa-star"}
                        style={{ fontSize: '0.5px' }}
                        ></i>
                    ))}
                    </span>
                  {/* other details */}
                </Details>
              </div>
  
              <div className="card-footer">
                <a href={product.product_link} className="btn btn-primary btn-sm">View</a>
              </div>
            </Card>
            
          </div>
          
        ))}
      </div>
    </div>
  );
  
  
};

export default CheapestProducts;


