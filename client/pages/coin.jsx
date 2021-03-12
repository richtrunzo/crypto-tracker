import React from 'react';

class Coin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      coinId: null,
      coinsM: [],
      coinsV: [],
      renderType: 'm'
    };
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coinsM: data });
      });

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=200&page=1&sparkline=true', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coinsV: data });
      });

  }

  toggleView() {
    if (event.target.value === 'Volume') {
      this.setState({
        renderType: 'v'
      });
    } else {
      this.setState({
        renderType: 'm'
      });
    }
  }

  renderMarket() {
    return <>
          <div className="d-flex justify-content-center mt-4">
          <form className="d-flex justify-content-center">
            <input type="text" placeholder="Seach for Coins" />
            <button>Search</button>
          </form>
          <label className="ms-3" htmlFor="sort">Sort By:</label>
          <select name="sort" className="ms-3" onChange={this.toggleView}>
            <option>Market Cap</option>
            <option>Volume</option>
          </select>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.coinsM.map((val, index) => {
            return <div key={index} className="mx-4 mt-3 px-5 border">
              <p className="text-center">{val.symbol.toUpperCase()}</p>
              <img className="mx-auto" src={val.image} width="100"/>
              <p className="text-center">{val.current_price}</p>
            </div>;
          }) }
        </div>;
        </>;
  }

  renderVolume() {
    return <>
          <div className="d-flex justify-content-center mt-4">
          <form className="d-flex justify-content-center">
            <input type="text" placeholder="Seach for Coins" />
            <button>Search</button>
          </form>
          <label className="ms-3" htmlFor="sort">Sort By:</label>
          <select name="sort" className="ms-3" onChange={this.toggleView}>
            <option>Market Cap</option>
            <option>Volume</option>
          </select>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.coinsV.map((val, index) => {
            return <div key={index} className="mx-4 mt-3 px-5 border">
              <p className="text-center">{val.symbol.toUpperCase()}</p>
              <img className="mx-auto" src={val.image} width="100"/>
              <p className="text-center">{val.current_price}</p>
            </div>;
          }) }
        </div>;
        </>;
  }

  render() {
    if (this.state.renderType === 'm') {
      return this.renderMarket();
    } else {
      return this.renderVolume();
    }
  }

}

export default Coin;
