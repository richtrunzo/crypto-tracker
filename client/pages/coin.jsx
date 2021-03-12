import React from 'react';

class Coin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      coinId: null,
      coins: []
    };
  }

  componentDidMount() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false', { method: 'GET' })
      .then(res => res.json())
      .then(data => console.log(data));

  }

  render() {
    return <form className="d-flex justify-content-center">
            <input type="text" placeholder="Seach for Coins" />
            <button>Search</button>
          </form>;
  }

}

export default Coin;
