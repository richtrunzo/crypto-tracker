import React from 'react';

function Navbar(props) {
  return <div>
    <div className="d-flex nwidth black">
      <div className="navwidth pt-5 text-center">
        <div className="d-flex ms-4">
          <i className="fab fa-bitcoin icon-size"></i>
          <p className="text ms-2">Crypto Tracker</p>
        </div>
      </div>
      <div>
      </div>
      <div className="navwidth text-center pt-5 d-flex justify-content-around">
        <p className="text mb-5">Coins</p>
        <p className="text mb-5">News</p>
      </div>
    </div>
  </div>;
}

export default Navbar;
