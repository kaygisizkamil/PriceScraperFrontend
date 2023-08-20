import React, { useState } from 'react';

const Navbar = ({ onSearchSubmit }) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQueryLocal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQueryLocal) {
      onSearchSubmit(searchQueryLocal); // Call the provided callback with search query
    }
  };
  
  return (
    <div className="navbar-container" >
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top"  style={{ background: "BLACK" }}>
        <div className="container">
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default navigation behavior
            window.location.reload(); // Refresh the page
          }}
        >
          Pc Ara
        </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              {/* Add your navigation links here */}
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <input
                  className="form-control form-control-lg mr-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQueryLocal} // Use the local searchQuery state
                  onChange={handleSearchInputChange}
                />
                <button
                  className="btn btn-outline-light"
                  type="submit"
                 // disabled={!isSearchEnabled && !searchQueryLocal}
                >
                  ara
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
  };  
export default Navbar;
