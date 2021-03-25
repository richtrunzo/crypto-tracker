import React from 'react';
import priceCalc from '../lib/fomo-calculate';

export default class Fomo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null,
      calculated: false,
      investment: null,
      coin: null,
      date: null,
      oldPrice: null,
      currentCash: null
    };

    this.investmentChange = this.investmentChange.bind(this);
    this.coinChange = this.coinChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.reset = this.reset.bind(this);

  }

  componentDidMount() {
    fetch('/api/market', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coins: data });
      });
  }

  investmentChange() {
    this.setState({ investment: event.target.value });
  }

  coinChange() {
    this.setState({ coin: event.target.value });
  }

  dateChange() {
    this.setState({ date: event.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    const coin = this.state.coin.toLowerCase();
    const date = this.state.date;

    fetch(`/api/date/${coin}/${date}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ oldPrice: data });
      })
      .then(fetch(`/api/coin/${coin}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          this.setState({
            currentCash: Math.floor(priceCalc(this.state.oldPrice, data.market_data.current_price.usd, this.state.investment))
          });
        })
        .then(() => {
          this.setState({ calculated: true });
        })
      );
  }

  reset() {
    this.setState({
      coins: this.state.coins,
      calculated: false,
      investment: null,
      coin: null,
      date: null,
      oldPrice: null,
      currentCash: null
    });
  }

  renderI() {
    return <div>
            <div className="mx-auto d-flex justify-content-center flex-column name-width">
              <p>Welcome to the FOMO Calculator!<br></br>
              This is where you can calculate the following: <br></br>
              If I had invested X amount in Y cryptocurrency on Z date, today I'd have $$$.<br></br>
              Fill out the form below to calculate your FOMO!
              </p>
            </div>
            <form className="mx-auto d-flex justify-content-center flex-column name-width" onSubmit={this.onFormSubmit}>
              <input className="mt-3" type="text" placeholder="Initial Investment" onChange={this.investmentChange}></input>
              <select defaultValue="Choose a Coin" className="mt-3" onChange={this.coinChange}>
                <option>Choose a Coin</option>
                {this.state.coins.map((val, index) => {
                  return <option key={index}>{val.name}</option>;
                })}
              </select>
              <input className="mt-3" onChange={this.dateChange} placeholder="Enter investment date: dd-mm-yyyy (i.e. 05-20-2010)"></input>
              <button className="mt-3">Calculate</button>
            </form>
          </div>;

  }

  renderD() {
    return <div>
            <div>
              <p className="text-center">If you invested <span>{(this.state.investment).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span> in <span>{this.state.coin}</span> on <span>{this.state.date}</span>, you would have <span>{(this.state.currentCash).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span> today.</p>
            </div>
            <div className="d-flex justify-content-center">
              <button onClick={this.reset}>Try Again</button>
            </div>
          </div>;
  }

  render() {
    if (this.state.coins === null && this.state.calculated === false) {
      return <>
            <div className="mt-5 d-flex justify-content-center">
                <i className="fas fa-cog fa-spin big-text"></i>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <p className="text">Loading...</p>
            </div>;
            </>;
    } else if (this.state.coins !== null && this.state.calculated === false) {
      return this.renderI();
    } else if (this.state.calculated === true) {
      return this.renderD();
    }
  }
}
