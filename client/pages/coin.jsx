import React from 'react';
import { Line } from 'react-chartjs-2';
import getDate from '../lib/date-check';

const lineData = {
  labels: [],
  datasets: [
    {
      label: null,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 6,
      pointHitRadius: 10,
      data: []
    }
  ]
};

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
    this.back = this.back.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
    lineData.datasets[0].label = event.target.id + ' one month chart';
    fetch(`https://api.coingecko.com/api/v3/coins/${event.target.id}?tickers=true&market_data=true&community_data=true`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ currentCoin: data });
      })
      .then(fetch(`https://api.coingecko.com/api/v3/coins/${event.target.id}/market_chart?vs_currency=usd&days=30&interval=daily`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          lineData.labels = [];
          lineData.datasets[0].data = [];
          for (let i = 0; i < data.prices.length; i++) {
            for (let j = 0; j < data.prices[i].length; j++) {
              if (j === 0) {
                lineData.labels.push(getDate(data.prices[i][j]));
              } else if (j === 1) {
                lineData.datasets[0].data.push(data.prices[i][j]);
              }
            }
          }
        })
      )
      .then(() => {
        this.setState({
          coinPage: true
        });
      });

  }

  back() {
    this.setState({
      coinPage: false,
      rendertype: 'm'
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    fetch(`https://api.coingecko.com/api/v3/coins/${this.state.coinId}?tickers=true&market_data=true&community_data=true`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ currentCoin: data });
      })
      .then(fetch(`https://api.coingecko.com/api/v3/coins/${this.state.coinId}/market_chart?vs_currency=usd&days=30&interval=daily`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          lineData.labels = [];
          lineData.datasets[0].data = [];
          for (let i = 0; i < data.prices.length; i++) {
            for (let j = 0; j < data.prices[i].length; j++) {
              if (j === 0) {
                lineData.labels.push(getDate(data.prices[i][j]));
              } else if (j === 1) {
                lineData.datasets[0].data.push(data.prices[i][j]);
              }
            }
          }
        })
      )
      .then(() => {
        this.setState({
          coinPage: true
        });
      });
  }

  onHandleChange() {
    this.setState({
      coinId: event.target.value.toLowerCase()
    });
  }

  renderMarket() {
    return <>
          <div className="d-flex justify-content-center mt-4">
          <form className="d-flex justify-content-center input-width" onSubmit={this.onFormSubmit}>
            <input type="text" placeholder="Seach for Coins e.g 'bitcoin'" className="input-width" onChange={this.onHandleChange}/>
            <button>Search</button>
          </form>
          <div className="input-width d-flex justify-content-center ">
          <label className="ms-3" htmlFor="sort">Sort By:</label>
          <select name="sort" className="ms-3" onChange={this.toggleView}>
            <option>Market Cap</option>
            <option>Volume</option>
          </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.coinsM.map((val, index) => {
            return <div key={index} id={val.id} className="mx-4 mt-3 mb-3 px-5 border cbackground" onClick={this.toggleCoin}>
              <p id={val.id} className="text-center">{val.symbol.toUpperCase()}</p>
              <img id={val.id} className="mx-auto" src={val.image} width="100" height="100" />
              <p className="text-center mt-1">{(val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>;
          }) }
        </div>
        </>;
  }

  renderVolume() {
    return <>
          <div className="d-flex justify-content-center mt-4">
          <form className="d-flex justify-content-center input-width" onSubmit={this.onFormSubmit}>
            <input type="text" placeholder="Seach for Coins e.g 'bitcoin'" className="input-width" onChange={this.onHandleChange}/>
            <button>Search</button>
          </form>
          <div className="input-width d-flex justify-content-center ">
          <label className="ms-3" htmlFor="sort">Sort By:</label>
          <select name="sort" className="ms-3" onChange={this.toggleView}>
            <option>Market Cap</option>
            <option>Volume</option>
          </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.coinsV.map((val, index) => {
            return <div key={index} id={val.id} className="mx-4 mt-3 mb-3 px-5 border cbackground" onClick={this.toggleCoin}>
              <p className="text-center" id={val.id} onClick={this.toggleCoin}>{val.symbol.toUpperCase()}</p>
              <img className="mx-auto" src={val.image} width="100"/>
              <p className="text-center">{(val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>;
          }) }
        </div>;
        </>;
  }

  renderCoin() {
    return <div>
            <div className="d-flex" onClick={this.back}>
              <i className="far fa-caret-square-left" onClick={this.back}></i>
              <p onClick={this.back}>Go Back</p>
            </div>
            <div className="d-flex">
              <div>
                <img src={this.state.currentCoin.image.large}/>
              </div>
            <div>
              <h2>{this.state.currentCoin.name} <span>{ `(${this.state.currentCoin.symbol.toUpperCase()})`}</span></h2>
              <p>Current Price: {(this.state.currentCoin.market_data.current_price.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p>24 Hour Change: {(this.state.currentCoin.market_data.price_change_24h_in_currency.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p>ATH: {(this.state.currentCoin.market_data.ath.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p>Market Cap: {(this.state.currentCoin.market_data.market_cap.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
          </div>
          <div>
            <p dangerouslySetInnerHTML={{ __html: this.state.currentCoin.description.en }}></p>
          </div>
          <div className="d-flex justify-content-center">
            <Line data={lineData} />
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
