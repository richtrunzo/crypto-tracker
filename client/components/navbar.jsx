import React, { useState } from 'react';

import Tick from './ticker';

function Navbar(props) {

  const [page, setPage] = useState(false);

  const onClick = () => {
    if (page === false) {
      setPage(true);
    } else {
      setPage(false);
    }
  };

  const Burger = () => {
    if (page === false) {
      return <i onClick={onClick} className="fas fa-bars"></i>;
    } else {
      return <>
        <div>
          <i onClick={onClick} className="back-text fas fa-bars"></i>
          <a href="#"><p className="text mb-5">Coins</p></a>
          <a href="#news"><p className="text mb-5">News</p></a>
          <a href="#fomo"><p className="text mb-5">FOMO</p></a>
        </div>
        </>;
    }
  };

  return <div>
    <div className="d-flex nwidth black">
      <div className="navwidth pt-5 text-center">
        <div className="d-flex ms-4">
          <a href="#"><i className="fab fa-bitcoin icon-size"></i></a>
          <p className="text ms-2">Crypto Tracker</p>
        </div>
      </div>
      <Burger />
    </div>
    <Tick />
    </div>;

}

export default Navbar;
