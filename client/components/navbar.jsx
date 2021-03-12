import React from 'react';

function Navbar(props) {
  return <div id="root">
    <div className="d-flex nwidth black">
      <div className="navwidth pt-5 text-center">
        <i className="fab fa-bitcoin icon-size pb-5"></i>
        <p>Coins</p>
      </div>
      <div>
        <p className="text">Crypto Tracker</p>
      </div>
      <div className="navwidth text-center pt-5">
        <i className="fas fa-newspaper icon-size pb-5"></i>
        <p>News</p>
      </div>
    </div>
  </div>;
}

export default Navbar;
