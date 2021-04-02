import React from 'react';
import { Line } from 'react-chartjs-2';
import getDate from '../lib/date-check';
import Select from 'react-select';

const lineData = {
  labels: [],
  datasets: [
    {
      label: null,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgb(187, 84, 82, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(255, 0, 0)',
      pointBackgroundColor: 'rgb(57, 63, 68)',
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

const options = [];

class Coin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      coinId: null,
      currentCoin: null,
      coinPage: false,
      error: false,
      loading: false,
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

    fetch('/api/market', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coinsM: data });
      })
      .then(() => {
        for (let i = 0; i < this.state.coinsM.length; i++) {
          const option = {
            value: this.state.coinsM[i].id,
            label: this.state.coinsM[i].name
          };
          options.push(option);
        }
      });

    fetch('/api/volume', { method: 'GET' })
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
    this.setState({
      coinId: event.target.id,
      loading: true
    });

    lineData.datasets[0].label = event.target.id + ' one month chart';

    const coin = event.target.id;

    fetch(`/api/coin/${coin}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.setState({ error: true });
        } else {
          this.setState({ currentCoin: data });
        }
      })
      .then(fetch(`/api/coins/${coin}`, { method: 'GET' })
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
        if (lineData.datasets[0].data.length !== 0) {
          this.setState({
            coinPage: true,
            loading: false
          });
        }
      });
  }

  back() {
    this.setState({
      coinPage: false,
      error: false,
      loading: false,
      rendertype: 'm'
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });

    lineData.datasets[0].label = this.state.coinId.value + ' one month chart';

    const coinValue = this.state.coinId.value.toLowerCase().replace(/\s/g, '');
    const coinMarket = this.state.coinId.value.toLowerCase().replace(/\s/g, '');

    fetch(`/api/coinval/${coinValue}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({ error: true });
        } else {
          this.setState({ currentCoin: data });
        }
      })
      .then(fetch(`/api/coinMarket/${coinMarket}`, { method: 'GET' })
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
        .then(() => {
          this.setState({
            coinPage: true,
            loading: false,
            coinId: null
          });
        })
      );

  }

  onHandleChange(coinId) {
    this.setState({ coinId });
  }

  renderMarket() {
    const { coinId } = this.state;
    return <>
          <div className="d-flex justify-content-center mt-4">
          <form className="d-flex input-width justify-content-center" onSubmit={this.onFormSubmit}>
            <Select className="input-width" onChange={this.onHandleChange} value={coinId} placeholder="Search for Coins" options={options} isSearchable={true} />
            <button className="font btn btn-danger mx-2">Search</button>
          </form>
          <div className="d-flex input-width justify-content-center ">
          <label className="ms-3 mt-2 font" htmlFor="sort">Sort By:</label>
          <select name="sort" className="ms-3 font" onChange={this.toggleView}>
            <option>Market Cap</option>
            <option>Volume</option>
          </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {this.state.coinsM.map((val, index) => {
            return <div key={val.id} id={val.id} className="pointer mx-4 mt-3 mb-3 px-5 cbackground animate__animated animate__fadeInUp" onClick={this.toggleCoin}>
              <p id={val.id} onClick={this.toggleCoin} className="pointer font text-center white-text">{val.symbol.toUpperCase()}</p>
              <img id={val.id} onClick={this.toggleCoin} className="pointer mx-auto" src={val.image} width="100" height="100" />
              <p className="font text-center mt-1 white-text">{(val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>;
          }) }
        </div>
        </>;
  }

  renderVolume() {
    const { coinId } = this.state;
    return <>
          <div className="d-flex justify-content-center mt-4">
          <form className="font d-flex justify-content-center input-width" onSubmit={this.onFormSubmit}>
            <Select className="input-width" onChange={this.onHandleChange} value={coinId} placeholder="Search for Coins" options={options} isSearchable={true} />
            <button className="font btn btn-danger mx-3">Search</button>
          </form>
          <div className="input-width d-flex justify-content-center ">
          <label className="ms-3 mt-2 font" htmlFor="sort">Sort By:</label>
          <select name="sort" className="font ms-3" onChange={this.toggleView}>
            <option>Market Cap</option>
            <option>Volume</option>
          </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {this.state.coinsV.map((val, index) => {
            if (index > 0) {
              return <div key={val.id} id={val.id} className="pointer mx-4 mt-3 mb-3 px-5 cbackground animate__animated animate__fadeInUp" onClick={this.toggleCoin}>
              <p className="pointer font text-center white-text" id={val.id} onClick={this.toggleCoin}>{val.symbol.toUpperCase()}</p>
              <img className="pointer mx-auto" id={val.id} onClick={this.toggleCoin} src={val.image} width="100"/>
              <p className="pointer font text-center white-text" id={val.id} onClick={this.toggleCoin}>{(val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>;
            }
          }) }
        </div>;
        </>;
  }

  renderCoin() {
    if (this.state.currentCoin === null) {
      return <>
            <div className="mt-5 d-flex justify-content-center">
                <i className="fas fa-cog fa-spin big-text"></i>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <p className="text">Loading...</p>
            </div>;
            </>;
    } else {
      return <>
            <div className="d-flex justify-content-center mt-4 flex-wrap">
                <i className="far fa-caret-square-left mt-5 red-dark back-btn mx-5 pointer" onClick={this.back}></i>
              <div>
                <img className="mb-5 animate__animated animate__zoomIn" src={this.state.currentCoin.image.large}/>
              </div>
            <div className="ms-5">
              <h2 className="font">{this.state.currentCoin.name} <span>{ `(${this.state.currentCoin.symbol.toUpperCase()})`}</span></h2>
              <p className="font">Current Price: {(this.state.currentCoin.market_data.current_price.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p className="font">24 Hour Change: {(this.state.currentCoin.market_data.price_change_24h_in_currency.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p className="font">ATH: {(this.state.currentCoin.market_data.ath.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p className="font">Market Cap: {(this.state.currentCoin.market_data.market_cap.usd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
          </div>
          <div className="mx-auto width-70">
            <p dangerouslySetInnerHTML={{ __html: this.state.currentCoin.description.en }}></p>
          </div>
          <div className="d-flex big-margin pt-5 justify-content-center mx-auto width-75">
            <Line data={lineData} />
          </div>
        </>;
    }
  }

  isLoading() {
    return <>
            <div className="mt-5 d-flex justify-content-center">
                <i className="fas fa-cog fa-spin big-text"></i>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <p className="text text-center">Loading all of the data<br></br>This might take a moment...</p>
            </div>;
          </>;
  }

  render() {
    if (this.state.error === true) {
      return <div className="fbackground mt-5 mx-auto">
              <p className="text-center fomo-font">Oh no, the data you're looking for was not found</p>
              <div className="d-flex mt-5 justify-content-center">
                <button className="btn btn-danger" onClick={this.back}>Click here to try again</button>
              </div>
            </div>;
    } else if (this.state.loading === true && this.state.coinPage === false) {
      return this.isLoading();
    } else if (this.state.renderType === 'm' && this.state.coinPage === false) {
      return this.renderMarket();
    } else if (this.state.renderType === 'v' && this.state.coinPage === false) {
      return this.renderVolume();
    } else if (this.state.coinPage === true) {
      return this.renderCoin();
    }
  }

}

export default Coin;
