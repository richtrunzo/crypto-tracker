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
      return <i onClick={onClick} className="mt-5 text-center col-4 icon-size fas fa-bars"></i>;
    } else {
      return <>
      <div className="col-4 mt-5 text-center">
        <div className="forward-menu position-fixed top-50 start-50 translate-middle mx-auto">
            <p className="menu-font mb-2 font mt-1 px-1 red-text bold-font">Menu</p>
            <a href="#" onClick={onClick}><p className="menu-font mb-2 font mt-5 px-1 white-text">Coins</p></a>
            <a href="#news"onClick={onClick}><p className="menu-font font mb-2 mt-5 px-1 white-text">News</p></a>
            <a href="#fomo"onClick={onClick}><p className="menu-font font mb-2 mt-5 px-1 white-text">FOMO</p></a>
            <i onClick={onClick} className="pointer menu-font mt-5 white-text fas fa-times"></i>
        </div>
        </div>
        </>;
    }
  };

  return <>
        <div className="main-header d-flex container-fluid justify-content-around">
          <div className="col-4 text-center mt-5">
            <a href="#"><i className="text-center fab fa-bitcoin icon-size"></i></a>
          </div>
          <p className="text font col-4 text-center bold-font">Crypto<br></br>Tracker</p>
          <Burger />
        </div>
          <Tick />
        </>;
}

export default Navbar;
