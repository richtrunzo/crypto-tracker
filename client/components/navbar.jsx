import React from 'react';

function Navbar(props) {
  return <div>
    <div className="d-flex nwidth black">
      <div className="navwidth pt-5 text-center">
        <div className="d-flex ms-4">
          <a href="#"><i className="fab fa-bitcoin icon-size"></i></a>
          <p className="text ms-2">Crypto Tracker</p>
        </div>
      </div>
      <div>
      </div>
      <div className="navwidth text-center pt-5 d-flex justify-content-around">
        <a href="#"><p className="text mb-5">Coins</p></a>
        <a href="#news"><p className="text mb-5">News</p></a>
        <a href="#fomo"><p className="text mb-5">FOMO</p></a>
      </div>
    </div>
  </div>;
}

export default Navbar;
