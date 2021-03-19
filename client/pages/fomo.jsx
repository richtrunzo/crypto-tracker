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
    console.log(this.state);
  }

  coinChange() {
    this.setState({ coin: event.target.value });
    console.log(this.state);
  }

  dateChange() {
    this.setState({ date: event.target.value });
    console.log(this.state);
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
        console.log(this.state.oldPrice);
      })
      .then(fetch(`/api/coin/${coin}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          this.setState({
            currentCash: priceCalc(this.state.oldPrice, data.market_data.current_price.usd, this.state.investment)
          });
        })
        .then(() => {
          console.log(this.state.currentCash);
        })
      );
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
              <input type="text" placeholder="Initial Investment" onChange={this.investmentChange}></input>
              <select onChange={this.coinChange}>
                {this.state.coins.map((val, index) => {
                  return <option key={index}>{val.name}</option>;
                })}
              </select>
              <input onChange={this.dateChange} placeholder="Enter investment date: dd-mm-yyyy (i.e. 05-20-2010)"></input>
              <button>Calculate</button>
            </form>
          </div>;

  }

  render() {
    if (this.state.coins === null) {
      return <div>test</div>;
    } else {
      return this.renderI();
    }
  }
}
