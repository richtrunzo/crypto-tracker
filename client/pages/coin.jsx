import React from 'react';

class Coin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      coinId: null,
      currentCoin: null,
      coinPage: false,
      coinsM: [],
      coinsV: [],
      renderType: 'm'
    };
    this.toggleView = this.toggleView.bind(this);
    this.toggleCoin = this.toggleCoin.bind(this);
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

  toggleCoin() {
    this.setState({ coinId: event.target.id });
    fetch(`https://api.coingecko.com/api/v3/coins/${event.target.id}?tickers=true&market_data=true&community_data=true`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ currentCoin: data });
        console.log(this.state.currentCoin);
      })
      .then(() => {
        this.setState({
          coinPage: true
        });
      });

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
            return <div key={index} id={val.id} className="mx-4 mt-3 px-5 border" onClick={this.toggleCoin}>
              <p id={val.id} className="text-center">{val.symbol.toUpperCase()}</p>
              <img id={val.id} className="mx-auto" src={val.image} width="100"/>
              <p className="text-center">{val.current_price}</p>
            </div>;
          }) }
        </div>
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

  renderCoin() {
    return <div>
            <div className="d-flex">
              <i className="far fa-caret-square-left"></i>
              <p>Go Back</p>
            </div>
            <div className="d-flex">
              <div>
                <img src={this.state.currentCoin.image.large}/>
              </div>
            <div>
              <h2>{this.state.currentCoin.name}<span>{`(${this.state.currentCoin.symbol.toUpperCase()})`}</span></h2>
              <p>Current Price: {this.state.currentCoin.market_data.current_price.usd}<span> 24 Hour Change: </span><span>{this.state.currentCoin.market_data.price_change_24h_in_currency.usd}</span></p>
              <p>ATH: {this.state.currentCoin.market_data.ath.usd}</p>
              <p>Market Cap: {this.state.currentCoin.market_data.market_cap.usd}</p>
            </div>
          </div>
          <div>
            <p dangerouslySetInnerHTML={{ __html: this.state.currentCoin.description.en }}></p>
          </div>
        </div>;
  }

  render() {
    if (this.state.renderType === 'm' && this.state.coinPage === false) {
      return this.renderMarket();
    } else if (this.state.renderType === 'v' && this.state.coinPage === false) {
      return this.renderVolume();
    } else if (this.state.coinPage === true) {
      return this.renderCoin();
    }
  }

}

export default Coin;
